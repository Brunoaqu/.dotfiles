import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DurationInSec } from '../domain/DurationInSec';
import { Scan } from '../domain/Scan';
import { Latitude } from '../domain/Latitude';
import { Longitude } from '../domain/Longitude';
import { Volume } from '../domain/Volume';
import { VolumeFormula } from '../domain/VolumeFormula';
import { SpecieFound } from '../domain/SpecieFound';
import { PileLength } from '../domain/PileLength';
import { AdditionalInformation } from '../domain/AdditionalInformation';
import { OriginalTimezone } from '../domain/OriginalTimezone';
import { OriginalCreationDate } from '../domain/OriginalCreationDate';
import { WoodLogName } from '../domain/WoodLogName';
import { Confiability } from '../domain/Confiability';
import { Height } from '../domain/Height';
import { Width } from '../domain/Width';
import { Device } from '../domain/Device';
import { AppVersion } from '../domain/AppVersion';
import { ScarfVersion } from '../domain/ScarfVersion';
import { SortingMin } from '../domain/SortingMin';
import { SortingMax } from '../domain/SortingMax';
import { UserId } from '../../users/domain/UserId';
import { Frame } from '../domain/Frame';
import { AvgFrameVolume } from '../domain/AvgFrameVolume';
import { Area } from '../domain/Area';
import { ReportType } from '../domain/ReportType';
import { ReportStatus } from '../domain/ReportStatus';
import { ReportStatusDescription } from '../domain/ReportStatusDescription';
import { ReportTypeDescription } from '../domain/ReportTypeDescription';
import { PileHeight } from '../domain/PileHeight';
import { PileWidth } from '../domain/PileWidth';
import { ReportName } from '../domain/ReportName';
import { ReportSettings } from '../domain/ReportSettings';
import { VolumeFactor } from '../../usersSettings/domain/VolumeFactor';
import { DiameterFactor } from '../../usersSettings/domain/DiameterFactor';

export class ScanMapper {
  public static toDomain(raw: any): Scan {
    const reportOrError = Scan.create(
      {
        reportType: ReportType.create(
          {
            description: ReportTypeDescription.create({
              value: raw.reportTypeDescription,
            }).getValue(),
          },
          new UniqueEntityID(raw.reportTypeId)
        ).getValue(),
        reportStatus: ReportStatus.create(
          {
            description: ReportStatusDescription.create({
              value: raw.reportStatusDescription,
            }).getValue(),
          },
          new UniqueEntityID(raw.reportStatusId)
        ).getValue(),
        reportSettings: ReportSettings.create({
          volumeFactor: VolumeFactor.create({ value: raw.volumeFactor }).getValue(),
          diameterFactor: DiameterFactor.create({ value: raw.diameterFactor }).getValue(),
        }).getValue(),
        reportName: ReportName.create({ value: raw.reportName }).getValue(),
        counter: raw.counter,
        createdAt: raw.createdAt,
        userId: UserId.create(new UniqueEntityID(raw.userId)).getValue(),
        appVersion: AppVersion.create({ value: raw.appVersion }).getValue(),
        scarfVersion: ScarfVersion.create({ value: raw.scarfVersion }).getValue(),
        device: Device.create({ value: raw.device }).getValue(),
        additionalInformation: AdditionalInformation.create({ value: raw.additionalInformation }).getValue(),
        originalTimezone: OriginalTimezone.create({ value: raw.originalTimezone }).getValue(),
        originalCreationDate: OriginalCreationDate.create({ value: raw.originalCreationDate }).getValue(),
        durationInSec: DurationInSec.create({ value: raw.durationInSec }).getValue(),
        latitude: Latitude.create({ value: raw.latitude }).getValue(),
        longitude: Longitude.create({ value: raw.longitude }).getValue(),
        volume: Volume.create({ value: raw.volume }).getValue(),
        volumeFormula: VolumeFormula.create({ value: raw.volumeFormula }).getValue(),
        specieFound: SpecieFound.create({ value: raw.specieFound }).getValue(),
        pileLength: PileLength.create({ value: raw.pileLength }).getValue(),
        pileHeight: PileHeight.create({ value: raw.pileHeight }).getValue(),
        pileWidth: PileWidth.create({ value: raw.pileWidth }).getValue(),
        sortingMin: SortingMin.create({ value: raw.sortingMin }).getValue(),
        sortingMax: SortingMax.create({ value: raw.sortingMax }).getValue(),
        area: Area.create({ value: raw.area }).getValue(),
        avgFrameVolume: AvgFrameVolume.create({ value: raw.avgFrameVolume }).getValue(),
        woodLogs: raw.woodLogs.map((log: any) => ({
          woodLogName: WoodLogName.create({ value: log.woodLogName }).getValue(),
          confiability: Confiability.create({ value: log.confiability }).getValue(),
          height: Height.create({ value: log.height }).getValue(),
          width: Width.create({ value: log.width }).getValue(),
          frame: Frame.create({ value: log.frame }).getValue(),
        })),
      },
      new UniqueEntityID(raw.reportId)
    );

    if (reportOrError.isFailure) {
      throw new Error(JSON.stringify(reportOrError.getErrorValue()));
    }

    return reportOrError.getValue();
  }

  public static async toPersistent(report: Scan) {
    return {
      rawReport: {
        reportId: report.reportId.getStringValue(),
        userId: report.userId.getStringValue(),
        reportTypeId: report.reportType.reportTypeId.getValue().toValue(),
        reportStatusId: report.reportStatus.reportStatusId.getValue().toValue(),
        reportName: report.reportName.value,
        reportSettings: report.reportSettings.getBuffer(),
        appVersion: report.appVersion.value,
        scarfVersion: report.scarfVersion?.value,
        device: report.device.value,
        additionalInformation: report.additionalInformation.value,
        originalTimezone: report.originalTimezone.value,
        originalCreationDate: report.originalCreationDate.value,
      },
      rawScan: {
        reportId: report.reportId.getStringValue(),
        durationInSec: report.durationInSec.value,
        latitude: report.latitude.value,
        longitude: report.longitude.value,
        volume: report.volume.value,
        volumeFormula: report.volumeFormula.value,
        specieFound: report.specieFound.value,
        pileLength: report.pileLength.value,
        pileHeight: report.pileHeight.value,
        pileWidth: report.pileWidth.value,
        sortingMin: report.sortingMin.value,
        sortingMax: report.sortingMax.value,
        area: report.area?.value,
        avgFrameVolume: report.avgFrameVolume?.value,
      },
      rawWoodLogs: report.woodLogs.map((log) => ({
        reportId: report.reportId.getStringValue(),
        woodLogName: log.woodLogName.value,
        confiability: log.confiability.value,
        height: log.height.value,
        width: log.width.value,
        frame: log.frame.value,
      })),
    };
  }

  public static toDTO(scan: Scan) {
    return {
      operatorId: scan.userId.getStringValue(),
      purchaserId: scan.userId.getStringValue(),
      reportId: scan.reportId.getStringValue(),
      reportTypeDescription: scan.reportType.description.value,
      reportStatusDescription: scan.reportStatus.description.value,
      reportName: scan.reportName.value,
      counter: scan.counter,
      additionalInformation: scan.additionalInformation.value,
      originalTimezone: scan.originalTimezone.value,
      originalCreationDate: scan.originalCreationDate.value,
      createdAt: scan.createdAt,
      durationInSec: scan.durationInSec.value,
      latitude: scan.latitude.value,
      longitude: scan.longitude.value,
      volume: scan.volume.value,
      volumeFormula: scan.volumeFormula.value,
      specieFound: scan.specieFound.value,
      pileLength: scan.pileLength.value,
      pileHeight: scan.pileHeight.value,
      pileWidth: scan.pileWidth.value,
      sortingMin: scan.sortingMin.value,
      sortingMax: scan.sortingMax.value,
      area: scan.area.value,
      avgFrameVolume: scan.avgFrameVolume.value,
      woodLogs: scan.woodLogs.map((log) => ({
        woodLogName: log.woodLogName.value,
        frame: log.frame.value,
        confiability: log.confiability.value,
        height: log.height.value,
        width: log.width.value,
      })),
    };
  }
}
