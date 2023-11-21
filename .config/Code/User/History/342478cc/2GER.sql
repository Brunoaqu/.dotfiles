CREATE FUNCTION ScanSelectWithCounter (@counterMin INT, @counterMax INT) RETURNS TABLE AS RETURN
SELECT reportId,
    counter
FROM Reports
    INNER JOIN ReportTypes ON Reports.reportTypeId = ReportTypes.reportTypeId
    INNER JOIN Scans ON Reports.reportId = Scans.reportId
WHERE reportTypeId = 1 counter >= @counterMin
    AND counter <= @counterMax
