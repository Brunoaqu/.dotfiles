CREATE FUNCTION ScanSelectWithCounter (@counterMin INT, @counterMax INT) RETURNS TABLE AS RETURN
SELECT Reports.reportId AS ID,
    Reports.counter AS Contador,
    reportTypeDescription AS Tipo,
    appVersion AS VersaoDoAplicativo,
    scarfVersion AS VersaoDoScarf,
    device AS Dispositivo,
    originalCreationDate AS DataDeCriacao,
    createdAt AS DataDeEnvio
FROM Reports
    INNER JOIN ReportTypes ON Reports.reportTypeId = ReportTypes.reportTypeId
    INNER JOIN Scans ON Reports.reportId = Scans.reportId
WHERE reportTypeId = 1 counter >= @counterMin
    AND counter <= @counterMax -- | Field                 | Type         | Null | Key | Default             | Extra |
    -- +-----------------------+--------------+------+-----+---------------------+-------+
    -- | reportId              | char(21)     | NO   | PRI | NULL                |       |
    -- | userId                | char(21)     | NO   | MUL | NULL                |       |
    -- | reportTypeId          | bigint(20)   | NO   |     | NULL                |       |
    -- | reportStatusId        | int(11)      | NO   | MUL | NULL                |       |
    -- | reportName            | varchar(255) | YES  |     | NULL                |       |
    -- | reportSettings        | blob         | YES  |     | NULL                |       |
    -- | appVersion            | varchar(50)  | YES  |     | NULL                |       |
    -- | scarfVersion          | varchar(50)  | YES  |     | NULL                |       |
    -- | device                | varchar(50)  | YES  |     | NULL                |       |
    -- | counter               | bigint(20)   | YES  |     | NULL                |       |
    -- | additionalInformation | mediumtext   | YES  |     | NULL                |       |
    -- | originalTimezone      | char(45)     | YES  |     | +0000               |       |
    -- | originalCreationDate  | datetime     | NO   |     | NULL                |       |
    -- | createdAt             | datetime     | YES  |     | current_timestamp() |       |
    -- +-----------------------+--------------+------+-----+---------------------+-------+
