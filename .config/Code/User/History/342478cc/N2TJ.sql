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
    Scans.avgFrameVolume AS VolumeMedioDoQuadro,
    WoodLogsProcessed.diameter AS TorasProcessadas
FROM Reports
    INNER JOIN ReportType ON Reports.reportTypeId = ReportType.reportTypeId
    INNER JOIN Scans ON Reports.reportId = Scans.reportId;

SELECT reportId, GROUP_CONCAT((height + width) / 2 SEPARATOR ';') AS diameter
FROM WoodLogs
GROUP BY reportId
