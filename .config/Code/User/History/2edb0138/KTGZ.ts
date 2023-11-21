import { AppVersion } from './AppVersion';
import { ScarfVersion } from './ScarfVersion';
import { Device } from './Device';
import { AdditionalInformation } from './AdditionalInformation';
import { OriginalTimezone } from './OriginalTimezone';
import { OriginalCreationDate } from './OriginalCreationDate';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { ReportId } from './ReportId';
import { UserId } from '../../users/domain/UserId';
import { ReportStatus } from './ReportStatus';
import { ReportType } from './ReportType';
import { ReportName } from './ReportName';
import { Result } from '../../../shared/core/Result';

export interface ReportProps {
  reportType: ReportType;
  reportStatus: ReportStatus;
  reportName: ReportName;
  userId: UserId;
  purchaserId?: string;
  counter?: number;
  appVersion: AppVersion;
  scarfVersion?: ScarfVersion;
  device: Device;
  additionalInformation: AdditionalInformation;
  originalTimezone: OriginalTimezone;
  originalCreationDate: OriginalCreationDate;
  reportSettings?: any;
  createdAt?: Date;
}

export abstract class Report<T extends ReportProps> extends AggregateRoot<T> {
  constructor(props: T, id?: UniqueEntityID) {
    super(props, id);
  }

  public get reportId() {
    return ReportId.create(this.id).getValue();
  }

  public get userId() {
    return this.props.userId;
  }

  public get purchaserId() {
    return this.props.purchaserId;
  }

  public get reportType() {
    return this.props.reportType;
  }

  public get reportStatus() {
    return this.props.reportStatus;
  }

  public get reportName() {
    return this.props.reportName;
  }

  public get reportSettings() {
    return this.props.reportSettings;
  }

  public get appVersion() {
    return this.props.appVersion;
  }

  public get scarfVersion() {
    return this.props.scarfVersion;
  }

  public get device() {
    return this.props.device;
  }

  public get counter() {
    return this.props.counter;
  }

  public get additionalInformation() {
    return this.props.additionalInformation;
  }

  public get originalTimezone() {
    return this.props.originalTimezone;
  }

  public get originalCreationDate() {
    return this.props.originalCreationDate;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get isArchived() {
    return this.props.reportStatus.description.value === 'archived';
  }

  public updateReportStatus(reportStatus: ReportStatus): void {
    this.props.reportStatus = reportStatus;
  }

  public updateReportName(reportName: ReportName): Result<void> {
    this.props.reportName = reportName;
    return Result.ok<void>();
  }
}
