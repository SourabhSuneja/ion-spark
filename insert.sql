-- General tab resources
INSERT INTO subject_resources
  (subject, grade, title, icon, page_key, link, min_width, display_order)
VALUES
  -- Common resources (grade is NULL, subject is General so they appear for any subscribed grade)
  ('General', NULL, 'My Result', 'podium-outline', 'result', 'https://sourabhsuneja.github.io/ion-spark/pages/result/', NULL, 0),
  ('General', NULL, 'Exam Syllabus', 'clipboard-outline', 'syllabus', 'https://sourabhsuneja.github.io/ion-spark/pages/syllabus/', NULL, 1),
  ('General', NULL, 'Sarthak AI', 'chatbubble-outline', 'sarthak', 'https://sourabhsuneja.github.io/ion-spark/pages/sarthak/', NULL, 2),
  ('General', NULL, 'Word of the Day', 'language', 'word-of-the-day', NULL, NULL, 3);



-- Grade Specific Cards
INSERT INTO subject_resources
  (subject, grade, title, icon, page_key, link, min_width, display_order)
VALUES
  ('Computer', 6, 'Worksheet', 'document-outline', 'worksheet', 'https://sourabhsuneja.github.io/question-paper/?ed=%7B%22schoolName%22%3A%22Jamna%20Vidyapeeth%22%2C%22examName%22%3A%22Practice%20Worksheet%22%2C%22subject%22%3A%22Computer%22%2C%22duration%22%3A60%2C%22grade%22%3A%22VI%22%7D&qpm=%7B%22avartan-6-ch-1%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22avartan-6-ch-2%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%7D&qc=%7B%22headings%22%3A%5B%22%22%2C%22%22%2C%22%22%2C%22%22%5D%2C%22qTypes%22%3A%5B%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%5D%2C%22weightPerQ%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22mustInclude%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22settings%22%3A%7B%22provideAnsOrSpace%22%3A%22space%22%2C%22randomiseSelection%22%3Atrue%2C%22strictChapterWiseDistribution%22%3Afalse%2C%22editable%22%3Afalse%2C%22showAIBtns%22%3Afalse%2C%22hideWeightage%22%3Atrue%2C%22showStudentDetails%22%3Afalse%2C%22border%22%3Afalse%2C%22shuffleMCQOptions%22%3Afalse%2C%22useDotPatternInBlanks%22%3Atrue%2C%22showHelpBoxInFillUp%22%3Afalse%2C%22mergeMatchItems%22%3Atrue%2C%22convertQForm%22%3A%7B%22MCQ%22%3A%7B%22toFillUp%22%3A0%2C%22toTF%22%3A0%2C%22toVSA%22%3A0%7D%2C%22flipTF%22%3Afalse%7D%2C%22spaceForAns%22%3A%7B%22Very%20Short%20Answer%20Type%22%3A1%2C%22Short%20Answer%20Type%22%3A3%2C%22Long%20Answer%20Type%22%3A5%2C%22Very%20Long%20Answer%20Type%22%3A8%2C%22Diagram%2FPicture%2FMap%20Based%22%3A6%7D%2C%22qTypesAllowedInImageQ%22%3A%5B%22Short%20Answer%20Type%22%2C%22Long%20Answer%20Type%22%2C%22Very%20Long%20Answer%20Type%22%2C%22Diagram%2FPicture%2FMap%20Based%22%5D%7D%7D&files=avartan-6-ch-1%2Bavartan-6-ch-2&diff=easy', 750, 0),
  ('Data Science', 9, 'Quiz', 'help-outline', 'quiz', 'https://sourabhsuneja.github.io/quiz/play/?title=Data+Science+Quiz&quizType=individual&s=&q=kips-8-ch-3%2Bbetween-8-ch-3&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&volume=100&customselect=y&usecards=n&useteam=n&teammap=%7B%7D&absent=%5B%5D&killPrevSession=y&quizID=Class+8+Quiz+Visit+from+Portal', NULL, 1);
