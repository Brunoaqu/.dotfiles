CREATE FUNCTION ConditionalReportSelect ( @reportTypeId INT, @counterMin INT, @counterMax INT )
RETURN TABLE
    SELECT reportId, counter FROM Reports WHERE counter >= 27 AND counter <= 73 AND reportTypeId = 1 ;
