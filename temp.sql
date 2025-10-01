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
