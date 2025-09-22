-- Table creation starts

-- Create teachers table
CREATE TABLE teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

-- Students table
create table students (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  grade int not null,
  section text,
  gender text not null,
  school text,
  house text,
  dob date,
  father_name text,
  phone text,
  address text,
  city text,
  access_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  created_at timestamp not null default now()
);

-- Settings table
create table settings (
  student_id uuid primary key references students(id) on delete cascade,
  theme smallint not null default 0 check (theme in (0,1)), -- 0 = dark, 1 = light
  avatar text not null default 'avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light',
  nickname text
);

-- Push subscriptions table
CREATE TABLE push_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subscription_object JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table creation ends

-- Function creation starts

-- Function to get student details using access tokens
CREATE OR REPLACE FUNCTION get_student_by_access_token(access_token_param TEXT)
RETURNS TABLE(name TEXT, grade INT, section TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    token_uuid UUID;
BEGIN
    -- Try to cast the input parameter to UUID
    BEGIN
        token_uuid := access_token_param::UUID;
    EXCEPTION
        WHEN invalid_text_representation THEN
            -- If casting fails, return null (no rows)
            RETURN;
    END;
    
    -- Check if a student with the given access token exists and return the result
    RETURN QUERY
    SELECT s.name, s.grade, s.section
    FROM students s
    WHERE s.access_token = token_uuid;
    
    -- If no rows are found, the function will naturally return empty result set
    -- which is equivalent to returning null in this context
END;
$$;

-- Function to get student profile (name, class, school etc) along with account settings (theme, avatar etc)
CREATE OR REPLACE FUNCTION get_student_profile(p_student_id UUID)
RETURNS TABLE (
  name TEXT,
  grade INT,
  section TEXT,
  gender TEXT,
  school TEXT,
  house TEXT,
  dob DATE,
  father_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  access_token UUID,
  theme SMALLINT,
  avatar TEXT,
  nickname TEXT
)
SECURITY INVOKER
LANGUAGE plpgsql
AS $$
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
  FROM students s
  LEFT JOIN settings st ON s.id = st.student_id
  WHERE s.id = p_student_id;
END;
$$;



-- Function creation ends