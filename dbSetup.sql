-- Table creation starts

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


-- Function creation ends