-- INSERT INTO Trees (UserId, date, score, createdAt, updatedAt)
-- SELECT UserId, date, score, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM Trees WHERE id = 72

UPDATE Trees
SET SeedId = 5
WHERE id = 75