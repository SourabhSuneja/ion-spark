-- Table creation starts
-- Table to store dashboard card information for each subject
CREATE TABLE subject_resources ( id BIGSERIAL PRIMARY KEY, subject TEXT NOT NULL, -- The grade this resource applies to. If NULL, it applies to all grades.
grade INT, title TEXT NOT NULL, icon TEXT NOT NULL, -- A unique key for the page/feature, e.g., 'result', 'worksheet'
page_key TEXT NOT NULL, -- The URL for the iframe, can be NULL for internal pages
link TEXT, min_width INT, -- To control the order of cards on the dashboard
display_order SMALLINT DEFAULT 0 NOT NULL );
-- Create teachers table
CREATE TABLE teachers ( id UUID PRIMARY KEY REFERENCES auth.users(id) 
ON 
DELETE
   CASCADE, name TEXT NOT NULL, email TEXT NOT NULL );
-- Students table
create table students ( id uuid primary key references auth.users(id) 
on 
delete
   cascade, name text not null, grade int not null, section text, gender text not null, school text, house text, dob date, father_name text, phone text, address text, city text, access_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE, created_at timestamp not null default now() );
-- Settings table
create table settings ( student_id uuid primary key references students(id) 
on 
delete
   cascade, theme smallint not null default 0 check (theme in 
   (
      0, 1
   )
), 	-- 0 = dark, 1 = light
   avatar text not null, nickname text );
-- Push subscriptions table
CREATE TABLE push_subscriptions ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), student_id UUID NOT NULL REFERENCES students(id) 
ON 
DELETE
   CASCADE, subscription_object JSONB NOT NULL, endpoint TEXT UNIQUE, created_at TIMESTAMP DEFAULT NOW() );
-- Notifications table
CREATE TABLE notifications ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, body TEXT, data JSONB, -- To store custom data like your notificationID
sent_by UUID REFERENCES public.teachers(id) 
ON 
DELETE
SET
   NULL, 	-- Links to the teacher who sent it
   target_criteria JSONB NOT NULL, 	-- Stores the target object, e.g., { "type": "grade-section", "value": "6-A1" }
   recipient_count INTEGER NOT NULL DEFAULT 0, 	-- How many devices were targeted
   created_at TIMESTAMP DEFAULT NOW() );
-- Table creation ends
-- Function creation starts
-- Function to get dashboard cards specific to a student and grade
CREATE 
OR REPLACE FUNCTION get_student_dashboard_data() RETURNS jsonb -- Return a single JSONB object
AS $$ 
DECLARE student_id_param UUID := auth.uid();
result jsonb;
BEGIN
   SELECT
      -- Aggregate all subjects and their cards into a single JSON object
      -- The structure will be: { "Computer": [...cards], "Science": [...cards] }
      jsonb_object_agg( subject, cards ) INTO result 
   FROM
      (
         SELECT
            s.subject,
            -- Aggregate all cards for a subject into a JSON array
            jsonb_agg( 				-- Build a JSON object for each card
            jsonb_build_object( 'title', sr.title, 'icon', sr.icon, 'page', sr.page_key, 				-- Use 'page' to match your existing JS property
            'link', sr.link, 'min_width', sr.min_width ) 
         ORDER BY
            sr.display_order ASC 				-- Ensure cards are ordered correctly
) AS cards 
         FROM
            -- Start with the student's subscriptions
            subscriptions s 
            JOIN
               -- Join with the resources table on the subject name
               subject_resources sr 
               ON s.subject = sr.subject 
         WHERE
            s.student_id = student_id_param 				-- CRITICAL: Match the resource if its grade is NULL (for all grades)
            -- OR if its grade matches the student's subscription grade.
            AND 
            (
               sr.grade IS NULL 
               OR sr.grade = s.grade
            )
         GROUP BY
            s.subject 
      )
      AS aggregated_subjects;
RETURN COALESCE(result, '{}'::jsonb);
-- Return the result or an empty JSON object
END
;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Function to get student details using access tokens
CREATE 
OR REPLACE FUNCTION get_student_by_access_token(access_token_param TEXT) RETURNS TABLE(name TEXT, grade INT, section TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$ 
DECLARE token_uuid UUID;
BEGIN
   -- Try to cast the input parameter to UUID
   BEGIN
      token_uuid := access_token_param::UUID;
EXCEPTION 
WHEN
   invalid_text_representation 
THEN
   -- If casting fails, return null (no rows)
   RETURN;
   END
;
-- Check if a student with the given access token exists and return the result
RETURN QUERY 
SELECT
   s.name,
   s.grade,
   s.section 
FROM
   students s 
WHERE
   s.access_token = token_uuid;
-- If no rows are found, the function will naturally return empty result set
-- which is equivalent to returning null in this context
END
;
$$ ;
-- Function to get student profile (name, class, school etc) along with account settings (theme, avatar etc)
CREATE 
OR REPLACE FUNCTION get_student_profile(p_student_id UUID) RETURNS TABLE ( name TEXT, grade INT, section TEXT, gender TEXT, school TEXT, house TEXT, dob DATE, father_name TEXT, phone TEXT, address TEXT, city TEXT, access_token UUID, theme SMALLINT, avatar TEXT, nickname TEXT ) SECURITY INVOKER LANGUAGE plpgsql AS $$ 
BEGIN
   RETURN QUERY 
   SELECT
      s.name::TEXT,
      s.grade::INT,
      s.section::TEXT,
      s.gender::TEXT,
      s.school::TEXT,
      s.house::TEXT,
      s.dob::DATE,
      s.father_name::TEXT,
      s.phone::TEXT,
      s.address::TEXT,
      s.city::TEXT,
      s.access_token::UUID,
      COALESCE(st.theme, 0::SMALLINT)::SMALLINT,
      COALESCE(st.avatar, 'avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light'::TEXT)::TEXT,
      st.nickname::TEXT 
   FROM
      students s 
      LEFT JOIN
         settings st 
         ON s.id = st.student_id 
   WHERE
      s.id = p_student_id;
END
;
$$ ;
-- Trigger functions start
-- Trigger function to auto-create settings for a new student
create 
or replace function create_settings_for_student() returns trigger as $$ 
begin
   insert into
      settings (student_id) 
   values
      (
         new.id
      )
;
return new;
end
;
$$ language plpgsql;
-- Trigger function to set default user avatar
CREATE 
OR REPLACE FUNCTION set_default_avatar() RETURNS TRIGGER AS $$ 
DECLARE student_gender text;
BEGIN
   -- Only set avatar if not provided
   IF NEW.avatar IS NULL 
THEN
   -- Look up gender from students table
   SELECT
      gender INTO student_gender 
   FROM
      students 
   WHERE
      id = NEW.student_id;
-- Assign avatar: Female only if gender='F', otherwise male version
IF student_gender = 'F' 
THEN
   NEW.avatar := 'avatarStyle=Circle&topType=LongHairStraight&hairColor=BrownDark&clotheType=BlazerSweater&eyeType=Happy&mouthType=Smile&skinColor=Light&facialHairType=Blank&accessoriesType=Blank';
ELSE
   NEW.avatar := 'avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light';
END
IF;
END
IF;
RETURN NEW;
END
;
$$ LANGUAGE plpgsql;
-- Create the function to handle subscription creation for JVP students
CREATE 
OR REPLACE FUNCTION handle_new_student_subscriptions() RETURNS TRIGGER AS $$ 
DECLARE subjects TEXT[];
subject_name TEXT;
BEGIN
   -- Proceed only if the student's school is 'Jamna Vidyapeeth'
   IF NEW.school = 'Jamna Vidyapeeth' 
THEN
   -- Insert 'General' subscription only if it doesn't already exist
   IF NOT EXISTS 
   (
      SELECT
         1 
      FROM
         subscriptions 
      WHERE
         student_id = NEW.id 
         AND subject = 'General' 
   )
THEN
   INSERT INTO
      subscriptions (student_id, grade, subject) 
   VALUES
      (
         NEW.id, NEW.grade, 'General'
      )
;
END
IF;
-- Determine the list of subjects based on grade and section
subjects := 
CASE
   NEW.grade 
   WHEN
      1 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'EVS', 'Computer', 'GK'] 
   WHEN
      2 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'EVS', 'Computer', 'GK'] 
   WHEN
      3 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Computer', 'GK'] 
   WHEN
      4 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Computer', 'GK'] 
   WHEN
      5 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Computer', 'GK'] 
   WHEN
      6 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'GK'] 
   WHEN
      7 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'GK'] 
   WHEN
      8 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Data Science', 'GK'] 
   WHEN
      9 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Data Science'] 
   WHEN
      10 
   THEN
      ARRAY['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Data Science'] 
   WHEN
      11 
   THEN
      CASE
         NEW.section 
         WHEN
            'SCI' 
         THEN
            ARRAY['English', 'Physics', 'Chemistry', 'Biology', 'Maths', 'P.E.', 'I.P.', 'Geography', 'Economics', 'Psychology', 'Fine Arts'] 
         WHEN
            'COM' 
         THEN
            ARRAY['English', 'Accountancy', 'B.St.', 'Economics', 'Maths', 'P.E.', 'I.P.', 'Applied Maths', 'Psychology', 'Fine Arts'] 
         WHEN
            'HUM' 
         THEN
            ARRAY['English', 'History', 'Geography', 'Pol. Sci.', 'Maths', 'P.E.', 'I.P.', 'Economics', 'Applied Maths', 'Psychology', 'Fine Arts'] 
         ELSE
            ARRAY[]::TEXT[] 
      END
      WHEN
         12 
      THEN
         CASE
            NEW.section 
            WHEN
               'SCI' 
            THEN
               ARRAY['English', 'Physics', 'Chemistry', 'Biology', 'Maths', 'P.E.', 'I.P.', 'Geography', 'Economics'] 
            WHEN
               'COM' 
            THEN
               ARRAY['English', 'Accountancy', 'B.St.', 'Economics', 'Maths', 'P.E.', 'I.P.'] 
            WHEN
               'HUM' 
            THEN
               ARRAY['English', 'History', 'Geography', 'Pol. Sci.', 'Maths', 'P.E.', 'I.P.', 'Economics'] 
            ELSE
               ARRAY[]::TEXT[] 
         END
         ELSE
            ARRAY[]::TEXT[] 
END
;
-- Loop through the subjects array and insert into subscriptions table
IF array_length(subjects, 1) > 0 
THEN
   FOREACH subject_name IN ARRAY subjects LOOP 
   INSERT INTO
      subscriptions (student_id, grade, subject) 
   VALUES
      (
         NEW.id, NEW.grade, subject_name
      )
;
END
LOOP;
END
IF;
END
IF;
RETURN NEW;
END
;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Trigger functions end
-- Function creation ends
-- Triggers start
-- After-insert trigger on students for creating settings
create trigger after_student_insert after insert 
on students for each row execute function create_settings_for_student();
-- Before-insert trigger on settings to set default avatar
CREATE TRIGGER trg_set_default_avatar BEFORE INSERT 
ON settings FOR EACH ROW EXECUTE FUNCTION set_default_avatar();
-- After-insert trigger on students to auto-subscribe JVP students to different subjects
CREATE TRIGGER on_student_insert_create_subscriptions AFTER INSERT 
ON students FOR EACH ROW EXECUTE FUNCTION handle_new_student_subscriptions();
-- Triggers end
-- RLS Policies start
-- Enable RLS for security
ALTER TABLE subject_resources ENABLE ROW LEVEL SECURITY;
-- Allow all authenticated users to read from this table.
-- The backend function will handle the filtering.
CREATE POLICY "Allow authenticated users to read resources" 
ON subject_resources FOR 
SELECT
   TO authenticated USING (true);
-- Enable RLS on the teachers table
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
-- Enable RLS on the students table
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
-- Create policy for students to manage their own data
CREATE POLICY "Students can manage their own data" 
ON students FOR ALL -- Applies to SELECT, INSERT, UPDATE, DELETE
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- Enable RLS on the settings table
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
-- Create policy for students to manage their own settings
CREATE POLICY "Students can manage their own settings" 
ON settings FOR ALL USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);
-- Enable RLS on the subscriptions table
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
-- Create policy for students to read their own subscriptions
CREATE POLICY "Students can read their own subscriptions" 
ON subscriptions FOR 
SELECT
   USING (auth.uid() = student_id);
-- Create policy for students to insert their own subscriptions
CREATE POLICY "Students can insert their own subscriptions" 
ON subscriptions FOR INSERT WITH CHECK (auth.uid() = student_id);
-- RLS Policies end