import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Merged } from '../domain/Merged';
import { AdditionalInformation } from '../domain/AdditionalInformation';
import { OriginalTimezone } from '../domain/OriginalTimezone';
import { OriginalCreationDate } from '../domain/OriginalCreationDate';
import { UserId } from '../../users/domain/UserId';
import { AppVersion } from '../domain/AppVersion';
import { ScarfVersion } from '../domain/ScarfVersion';
import { Device } from '../domain/Device';
import { ReportId } from '../domain/ReportId';
import { ReportType } from '../domain/ReportType';
import { ReportTypeDescription } from '../domain/ReportTypeDescription';
import { ReportStatus } from '../domain/ReportStatus';
import { ReportName } from '../domain/ReportName';
import { ReportSettings } from '../domain/ReportSettings';
import { VolumeFactor } from '../../usersSettings/domain/VolumeFactor';
import { DiameterFactor } from '../../usersSettings/domain/DiameterFactor';

export class MergedMapper {
  public static toDomain(raw: any): Merged {
    raw = { ...raw, ...JSON.parse(raw.reportSettings) };

    const reportOrError = Merged.create(
      {
        reportType: ReportType.create(
          { description: ReportTypeDescription.create({ value: raw.reportTypeDescription }).getValue() },
          new UniqueEntityID(raw.reportTypeId)
        ).getValue(),
        reportStatus: ReportStatus.create(
          { description: ReportTypeDescription.create({ value: raw.reportStatusDescription }).getValue() },
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
        scansId: raw.scan.map((s: any) => ReportId.create(new UniqueEntityID(s.scanId)).getValue()),
        appVersion: AppVersion.create({ value: raw.appVersion }).getValue(),
        scarfVersion: ScarfVersion.create({ value: raw.scarfVersion }).getValue(),
        device: Device.create({ value: raw.device }).getValue(),
        additionalInformation: AdditionalInformation.create({ value: raw.additionalInformation }).getValue(),
        originalCreationDate: OriginalCreationDate.create({ value: raw.originalCreationDate }).getValue(),
        originalTimezone: OriginalTimezone.create({ value: raw.originalTimezone }).getValue(),
      },
      new UniqueEntityID(raw.reportId)
    );

    if (reportOrError.isFailure) {
      throw new Error(JSON.stringify(reportOrError.getErrorValue()));
    }

    return reportOrError.getValue();
  }

  public static async toPersistent(group: Merged): Promise<any> {
    return {
      rawMerged: {
        userId: group.userId.getStringValue(),
        reportId: group.reportId.getStringValue(),
        reportStatusId: group.reportStatus.reportStatusId.getValue().toValue(),
        reportTypeId: group.reportType.reportTypeId.getValue().toValue(),
        reportName: group.reportName.value,
        reportSettings: group.reportSettings.getBuffer(),
        appVersion: group.appVersion.value,
        device: group.device.value,
        additionalInformation: group.additionalInformation.value,
        originalCreationDate: group.originalCreationDate.value,
        originalTimezone: group.originalTimezone.value,
      },
      rawTransaction: group.scansId.map((scanId) => ({
        reportId: group.reportId.getStringValue(),
        scanId: scanId.getStringValue(),
      })),
    };
  }

  public static toDTO(group: Merged): any {
    return {
      reportId: group.reportId.getStringValue(),
      reportTypeDescription: group.reportType.description.value,
      reportStatusDescription: group.reportStatus.description.value,
      reportName: group.reportName.value,
      operatorId: group.userId.getStringValue(),
      purchaserId: null,
      counter: group.counter,
      additionalInformation: group.additionalInformation.value,
      originalCreationDate: group.originalCreationDate.value,
      originalTimezone: group.originalTimezone.value,
      createdAt: group.createdAt,
      reportSettings: {
        volumeFactor: group.reportSettings.volumeFactor.value,
        diameterFactor: group.reportSettings.diameterFactor.value,
      },
      scans: group.scansId.map((scanId) => scanId.getStringValue()),
    };
  }
}
