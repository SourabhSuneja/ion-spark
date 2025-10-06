-- =========================
-- DROP TABLES (parent → child)
-- This will also automatically drop associated triggers, policies, and constraints.
-- =========================
DROP TABLE IF EXISTS menu_resources CASCADE;
DROP TABLE IF EXISTS subject_resources CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS push_subscriptions CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;

-- =========================
-- DROP FUNCTIONS
-- These are not tied to a table, so they need to be dropped separately.
-- =========================
DROP FUNCTION IF EXISTS get_student_dashboard_data();
DROP FUNCTION IF EXISTS get_student_by_access_token(TEXT);
DROP FUNCTION IF EXISTS get_student_profile(UUID);
DROP FUNCTION IF EXISTS create_settings_for_student();
DROP FUNCTION IF EXISTS set_default_avatar();
DROP FUNCTION IF EXISTS handle_new_student_subscriptions();


-- =========================
-- TABLE CREATION
-- =========================

-- Table to store menu items for app's navigation drawer
CREATE TABLE menu_resources (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    page_key TEXT NOT NULL UNIQUE,
    link TEXT NOT NULL,
    min_width INT,
    display_order SMALLINT NOT NULL DEFAULT 0,
    extra JSONB
);

-- Table to store dashboard card information for each subject
CREATE TABLE subject_resources (
    id            BIGSERIAL PRIMARY KEY,
    subject       TEXT NOT NULL,
    grade         INT, -- NULL = applies to all grades
    title         TEXT NOT NULL,
    icon          TEXT NOT NULL,
    page_key      TEXT NOT NULL UNIQUE,
    link          TEXT,          -- The URL for the iframe, can be NULL for internal pages
    min_width     INT,
    display_order SMALLINT DEFAULT 0 NOT NULL,
    extra JSONB
);

-- Students table
CREATE TABLE students (
    id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name         TEXT NOT NULL,
    grade        INT NOT NULL,
    section      TEXT,
    gender       TEXT NOT NULL,
    school       TEXT,
    house        TEXT,
    dob          DATE,
    father_name  TEXT,
    phone        TEXT,
    address      TEXT,
    city         TEXT,
    access_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    created_at   TIMESTAMP NOT NULL DEFAULT now(),
    extra JSONB
);

-- Subscriptions table
CREATE TABLE subscriptions (
    id                  BIGSERIAL PRIMARY KEY,
    student_id          UUID REFERENCES students(id) ON DELETE CASCADE,
    grade               INT NOT NULL,
    subject             TEXT NOT NULL,
    subscription_plan   TEXT NOT NULL DEFAULT 'Free',
    subscription_ends_at TIMESTAMP NOT NULL DEFAULT '2026-03-31 23:59:59',
    extra               JSONB,

    -- Prevent duplicates: one subscription per student per grade and subject
    UNIQUE (student_id, grade, subject)
);

-- Teachers table
CREATE TABLE teachers (
    id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name  TEXT NOT NULL,
    email TEXT NOT NULL,
    extra JSONB
);

-- Settings table
CREATE TABLE settings (
    student_id UUID PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
    theme      SMALLINT NOT NULL DEFAULT 0 CHECK (theme IN (0, 1)), -- 0 = dark, 1 = light
    avatar     TEXT NOT NULL,
    nickname   TEXT,
    extra      JSONB
);

-- Push subscriptions table
CREATE TABLE push_subscriptions (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id         UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subscription_object JSONB NOT NULL,
    endpoint           TEXT UNIQUE,
    created_at         TIMESTAMP DEFAULT now()
);

-- Notifications table
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    body            TEXT,
    data            JSONB, -- Custom payload like notificationID
    sent_by         UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    target_criteria JSONB NOT NULL, -- e.g., { "type": "grade-section", "value": "6-A1" }
    recipient_count INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMP DEFAULT now()
);


-- =========================
-- FUNCTIONS
-- =========================

-- Function: get dashboard cards specific to a student
CREATE OR REPLACE FUNCTION get_student_dashboard_data()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    student_id_param UUID := auth.uid();
    result           jsonb;
BEGIN
    SELECT jsonb_object_agg(subject, cards) INTO result
    FROM (
        SELECT
            s.subject,
            jsonb_agg(
                jsonb_build_object(
                    'title',     sr.title,
                    'icon',      sr.icon,
                    'page',      sr.page_key,
                    'link',      sr.link,
                    'min_width', sr.min_width,
                    'extra', sr.extra
                )
                ORDER BY sr.display_order ASC
            ) AS cards
        FROM subscriptions s
        JOIN subject_resources sr
          ON s.subject = sr.subject
        WHERE s.student_id = student_id_param
          AND (sr.grade IS NULL OR sr.grade = s.grade)
        GROUP BY s.subject
    ) AS aggregated_subjects;

    RETURN COALESCE(result, '{}'::jsonb);
END;
$$;

-- Function: get student details using access tokens
CREATE OR REPLACE FUNCTION get_student_by_access_token(access_token_param TEXT)
RETURNS TABLE (name TEXT, grade INT, section TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    token_uuid UUID;
BEGIN
    -- Try casting the input
    BEGIN
        token_uuid := access_token_param::UUID;
    EXCEPTION WHEN invalid_text_representation THEN
        RETURN; -- invalid token string → return nothing
    END;

    RETURN QUERY
    SELECT s.name, s.grade, s.section
    FROM students s
    WHERE s.access_token = token_uuid;
END;
$$;

-- Function: get student profile (details + settings)
CREATE OR REPLACE FUNCTION get_student_profile(p_student_id UUID)
RETURNS TABLE (
    name        TEXT,
    grade       INT,
    section     TEXT,
    gender      TEXT,
    school      TEXT,
    house       TEXT,
    dob         DATE,
    father_name TEXT,
    phone       TEXT,
    address     TEXT,
    city        TEXT,
    access_token UUID,
    theme       SMALLINT,
    avatar      TEXT,
    nickname    TEXT
)
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.name,
        s.grade,
        s.section,
        s.gender,
        s.school,
        s.house,
        s.dob,
        s.father_name,
        s.phone,
        s.address,
        s.city,
        s.access_token,
        COALESCE(st.theme, 0::SMALLINT),
        COALESCE(
            st.avatar,
            'avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light'
        ),
        st.nickname
    FROM students s
    LEFT JOIN settings st ON s.id = st.student_id
    WHERE s.id = p_student_id;
END;
$$;


-- =========================
-- TRIGGER FUNCTIONS
-- =========================

-- Auto-create settings for a new student
CREATE OR REPLACE FUNCTION create_settings_for_student()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO settings (student_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$;

-- Set default avatar
CREATE OR REPLACE FUNCTION set_default_avatar()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    student_gender TEXT;
BEGIN
    -- The avatar column is defined as NOT NULL in the settings table.
    -- This check for NULL might be redundant unless you plan to change the table definition.
    -- However, it is good practice to keep it.
    -- We also need to handle the case where the INSERT statement explicitly sets avatar to NULL.
    IF NEW.avatar IS NULL THEN
        SELECT gender INTO student_gender FROM students WHERE id = NEW.student_id;

        IF student_gender = 'F' THEN
            NEW.avatar := 'avatarStyle=Circle&topType=LongHairStraight&hairColor=BrownDark&clotheType=BlazerSweater&eyeType=Happy&mouthType=Smile&skinColor=Light';
        ELSE
            NEW.avatar := 'avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


-- Auto-subscribe Jamna Vidyapeeth students
CREATE OR REPLACE FUNCTION handle_new_student_subscriptions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    subjects      TEXT[];
    subject_name  TEXT;
BEGIN
    IF NEW.school = 'Jamna Vidyapeeth' THEN
        -- Add "General" subscription if not exists
        IF NOT EXISTS (
            SELECT 1 FROM subscriptions
            WHERE student_id = NEW.id AND subject = 'General'
        ) THEN
            INSERT INTO subscriptions (student_id, grade, subject)
            VALUES (NEW.id, NEW.grade, 'General');
        END IF;

        -- Determine subjects list
        subjects :=
            CASE NEW.grade
                WHEN 1 THEN ARRAY['English','Hindi','Maths','EVS','Computer','GK']
                WHEN 2 THEN ARRAY['English','Hindi','Maths','EVS','Computer','GK']
                WHEN 3 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Computer','GK']
                WHEN 4 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Computer','GK']
                WHEN 5 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Computer','GK']
                WHEN 6 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Sanskrit','Computer','GK']
                WHEN 7 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Sanskrit','Computer','GK']
                WHEN 8 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Sanskrit','Data Science','GK']
                WHEN 9 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Data Science']
                WHEN 10 THEN ARRAY['English','Hindi','Maths','Science','Social Science','Data Science']
                WHEN 11 THEN
                    CASE NEW.section
                        WHEN 'SCI' THEN ARRAY['English','Physics','Chemistry','Biology','Maths','P.E.','I.P.','Geography','Economics','Psychology','Fine Arts']
                        WHEN 'COM' THEN ARRAY['English','Accountancy','B.St.','Economics','Maths','P.E.','I.P.','Applied Maths','Psychology','Fine Arts']
                        WHEN 'HUM' THEN ARRAY['English','History','Geography','Pol. Sci.','Maths','P.E.','I.P.','Economics','Applied Maths','Psychology','Fine Arts']
                        ELSE ARRAY[]::TEXT[]
                    END
                WHEN 12 THEN
                    CASE NEW.section
                        WHEN 'SCI' THEN ARRAY['English','Physics','Chemistry','Biology','Maths','P.E.','I.P.','Geography','Economics']
                        WHEN 'COM' THEN ARRAY['English','Accountancy','B.St.','Economics','Maths','P.E.','I.P.']
                        WHEN 'HUM' THEN ARRAY['English','History','Geography','Pol. Sci.','Maths','P.E.','I.P.','Economics']
                        ELSE ARRAY[]::TEXT[]
                    END
                ELSE ARRAY[]::TEXT[]
            END;

        -- Insert subject subscriptions
        IF array_length(subjects, 1) > 0 THEN
            FOREACH subject_name IN ARRAY subjects LOOP
                INSERT INTO subscriptions (student_id, grade, subject)
                VALUES (NEW.id, NEW.grade, subject_name);
            END LOOP;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


-- =========================
-- TRIGGERS
-- =========================
CREATE TRIGGER after_student_insert
AFTER INSERT ON students
FOR EACH ROW
EXECUTE FUNCTION create_settings_for_student();

CREATE TRIGGER trg_set_default_avatar
BEFORE INSERT ON settings
FOR EACH ROW
EXECUTE FUNCTION set_default_avatar();

CREATE TRIGGER on_student_insert_create_subscriptions
AFTER INSERT ON students
FOR EACH ROW
EXECUTE FUNCTION handle_new_student_subscriptions();


-- =========================
-- RLS POLICIES
-- =========================

-- Menu resources
ALTER TABLE menu_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to read resources"
    ON menu_resources FOR SELECT
    TO authenticated
    USING (true);

-- Subject resources
ALTER TABLE subject_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to read resources"
    ON subject_resources FOR SELECT
    TO authenticated
    USING (true);

-- Teachers
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Students
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can manage their own data"
    ON students FOR ALL
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can manage their own settings"
    ON settings FOR ALL
    USING (auth.uid() = student_id)
    WITH CHECK (auth.uid() = student_id);

-- Subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can read their own subscriptions"
    ON subscriptions FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own subscriptions"
    ON subscriptions FOR INSERT
    WITH CHECK (auth.uid() = student_id);


-- =========================
-- INSERT INITIAL SEED DATA
-- =========================

-- Menu resources for navigation drawer
INSERT INTO menu_resources (
    title,
    icon,
    page_key,
    link,
    display_order
)
VALUES
    ('Dashboard',     'home',               'dashboard',      '',                                      1),
    ('My Progress',   'bar-chart',  'my-progress',    'pages/progress-report/index.html',      2),
    ('Notifications', 'notifications',      'notifications',  'pages/notifications/index.html',        3),
    ('Subscriptions',   'ribbon',  'subscriptions',    '',      4),
    ('Settings',      'settings',           'settings',       'pages/account/index.html',              5),
    ('Developer',     'code',       'about-developer','pages/about-developer/index.html',      6);

-- General tab resources for dashboard
INSERT INTO subject_resources (
    subject,
    grade,
    title,
    icon,
    page_key,
    link,
    min_width,
    display_order,
    extra
)
VALUES
    -- Common resources (grade is NULL, subject is General so they appear for any subscribed grade)
    (
        'General', 
        NULL, 
        'My Result', 
        'podium-outline', 
        'result', 
        'pages/result/index.html', 
        NULL, 
        1, 
        '{"jvpOnly": true}'
    ),
    (
        'General', 
        NULL, 
        'My Attendance', 
        'calendar-clear-outline', 
        'attendance', 
        'pages/coming-soon/index.html', 
        NULL, 
        2, 
        '{"jvpOnly": true}'
    ),
    (
        'General', 
        NULL, 
        'Syllabus', 
        'clipboard-outline', 
        'syllabus', 
        'pages/syllabus/index.html?exam=Term-1', 
        NULL, 
        3, 
        '{"jvpOnly": true}'
    ),
    (
        'General', 
        NULL, 
        'Blueprint', 
        'reader-outline', 
        'blueprint', 
        'pages/blueprint/index.html?exam=Term-1', 
        NULL, 
        4, 
        '{"jvpOnly": true}'
    ),
    (
        'General', 
        NULL, 
        'File Vault', 
        'folder-open-outline', 
        'vault', 
        'https://drive.google.com/embeddedfolderview?id=13PUh09AAJn7DLlhAxflcOSE_uQo3im_N', 
        NULL, 
        5, 
        '{"jvpOnly": true, "forcedTheme": "light"}'
    ),
    (
        'General', 
        NULL, 
        'Word of the Day', 
        'language', 
        'word-of-the-day', 
        NULL, 
        NULL, 
        6, 
        NULL
    ),
    (
        'General', 
        NULL, 
        'Sarthak AI', 
        'chatbubble-outline', 
        'sarthak', 
        'pages/sarthak/index.html', 
        NULL, 
        7, 
        NULL
    ),
    (
        'General', 
        NULL, 
        'Memory Game', 
        'albums-outline', 
        'flashcard-memory-game', 
        'pages/flashcard-memory-game/index.html', 
        NULL, 
        8, 
        NULL
    ),
    (
        'General', 
        NULL, 
        'Focus Builder', 
        'bulb-outline', 
        'color-meaning-game', 
        'pages/color-meaning-game/index.html', 
        NULL, 
        9, 
        NULL
    ),
    (
        'General', 
        NULL, 
        'Rabbit Run', 
        'paw-outline', 
        'rabbit-run-game', 
        'pages/rabbit-run-game/index.html', 
        NULL, 
        10, 
        NULL
    ),
    (
        'General', 
        NULL, 
        'Rubic Cube', 
        'cube-outline', 
        'rubic-cube-game', 
        'pages/rubic-cube-game/index.html', 
        NULL, 
        11, 
        '{"forcedTheme": "light"}'
    );


