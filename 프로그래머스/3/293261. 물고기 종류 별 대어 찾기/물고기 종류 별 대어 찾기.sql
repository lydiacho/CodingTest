-- 코드를 작성해주세요
SELECT A.ID as ID, B.FISH_NAME as FISH_NAME, C.LENGTH as LENGTH FROM FISH_INFO as A JOIN FISH_NAME_INFO as B ON A.FISH_TYPE = B.FISH_TYPE JOIN (SELECT FISH_TYPE, MAX(LENGTH) as LENGTH FROM FISH_INFO GROUP BY FISH_TYPE) as C ON A.FISH_TYPE = C.FISH_TYPE WHERE A.LENGTH = C.LENGTH ORDER BY A.ID;