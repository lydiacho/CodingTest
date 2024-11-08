-- 코드를 작성해주세요
-- Parent로 언급되지 않은 ID 
SELECT ITEM_ID, ITEM_NAME, RARITY FROM ITEM_INFO
WHERE ITEM_ID NOT IN (SELECT DISTINCT PARENT_ITEM_ID FROM ITEM_TREE WHERE PARENT_ITEM_ID IS NOT NULL)
ORDER BY ITEM_ID DESC;