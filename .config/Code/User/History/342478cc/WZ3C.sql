CREATE FUNCTION ScanSelectWithCounter (@counterMin INT, @counterMax INT) RETURNS TABLE AS RETURN
SELECT Reports.reportId AS ID,
    Reports.counter AS Contador,
    ReportType.reportTypeDescription AS Tipo,
    Reports.appVersion AS VersaoDoAplicativo,
    Reports.scarfVersion AS VersaoDoScarf,
    Reports.device AS Dispositivo,
    Reports.originalCreationDate AS DataDeCriacao,
    Reports.createdAt AS DataDeEnvio,
    Reports.additionalInformation AS InformacoesAdicionais,
    Scans.durationInSec AS DuracaoEmSegundos,
    Scans.latitude AS Latitude,
    Scans.longitude AS Longitude,
    Scans.volume AS Volume,
    Scans.volumeFormula AS FormulaDeVolume,
    Scans.specieFound AS EspecieEncontrada,
    Scans.pileLength AS ComprimentoDaPilha,
    Scans.pileWidth AS LarguraDaPilha,
    Scans.pileHeight AS AlturaDaPilha,
    Scans.sortingMin AS SortimentoMinimo,
    Scans.sortingMax AS SortimentoMaximo,
    Scans.area AS Area,
    Scans.avgFrameVolume AS VolumeMedioDoQuadro
FROM Reports
    INNER JOIN ReportType ON Reports.reportTypeId = ReportType.reportTypeId
    INNER JOIN Scans ON Reports.reportId = Scans.reportId
    INNER JOIN (
        SELECT reportId, GROUP_CONCAT((height + width) / 2, ) FROM WoodLogs
    ) AS WoodLogsProcessed ON Reports.reportId = WoodLogsProcessed.reportId
LIMIT 1
WHERE reportTypeId = 1 counter >= @counterMin
    AND counter <= @counterMax



-- +-----------------------+--------------+------+-----+---------------------+-------+
-- | Field                 | Type         | Null | Key | Default             | Extra |
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

-- +----------------+----------------+------+-----+---------+-------+
-- | Field          | Type           | Null | Key | Default | Extra |
-- +----------------+----------------+------+-----+---------+-------+
-- | reportId       | char(21)       | NO   | PRI | NULL    |       |
-- | durationInSec  | bigint(20)     | NO   |     | NULL    |       |
-- | latitude       | decimal(18,15) | NO   |     | NULL    |       |
-- | longitude      | decimal(18,15) | NO   |     | NULL    |       |
-- | volume         | decimal(10,4)  | NO   |     | NULL    |       |
-- | volumeFormula  | varchar(255)   | YES  |     | NULL    |       |
-- | specieFound    | varchar(255)   | YES  |     | NULL    |       |
-- | pileLength     | decimal(10,4)  | NO   |     | NULL    |       |
-- | pileWidth      | decimal(10,4)  | YES  |     | NULL    |       |
-- | pileHeight     | decimal(10,4)  | YES  |     | NULL    |       |
-- | sortingMin     | decimal(10,5)  | YES  |     | NULL    |       |
-- | sortingMax     | decimal(10,5)  | YES  |     | NULL    |       |
-- | area           | decimal(10,4)  | YES  |     | NULL    |       |
-- | avgFrameVolume | decimal(10,4)  | YES  |     | NULL    |       |
