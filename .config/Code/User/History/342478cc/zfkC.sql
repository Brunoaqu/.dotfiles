CREATE FUNCTION ConditionalReportSelect (
    @reportTypeId INT,
    @counterMin INT,
    @counterMax INT
) RETURNS TABLE AS RETURN
SELECT reportId,
    counter
FROM Reports
WHERE reportTypeId = 1
    counter >= 27
        AND counter <= 73
