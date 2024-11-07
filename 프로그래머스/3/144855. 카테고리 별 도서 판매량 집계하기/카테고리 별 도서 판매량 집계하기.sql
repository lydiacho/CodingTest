-- 코드를 입력하세요
SELECT 
    A.CATEGORY as CATEGORY, SUM(B.SALES) as TOTAL_SALES
    FROM BOOK as A
JOIN 
    BOOK_SALES as B 
    ON A.BOOK_ID = B.BOOK_ID
WHERE YEAR(B.SALES_DATE)=2022 and MONTH(B.SALES_DATE) = 1
GROUP BY A.CATEGORY
ORDER BY A.CATEGORY;