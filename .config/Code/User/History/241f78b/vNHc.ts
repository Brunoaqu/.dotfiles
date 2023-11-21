import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AdditionalInformation } from '../../../domain/AdditionalInformation';
import { OriginalCreationDate } from '../../../domain/OriginalCreationDate';
import { OriginalTimezone } from '../../../domain/OriginalTimezone';
import { AppError } from '../../../../../shared/core/AppError';
import { CreateMergedErrors } from './CreateMergedErrors';
import { IMergedRepo } from '../../../repo/IGroupRepo';
import { CreateMergedDTO } from './CreateMergedDTO';
import { IScanRepo } from '../../../repo/IScanRepo';
import { Merged } from '../../../domain/Merged';
import { AppVersion } from '../../../domain/AppVersion';
import { Device } from '../../../domain/Device';
import { Scan } from '../../../domain/Scan';
import { User } from '../../../../users/domain/User';
import { IUserRepo } from '../../../../users/repo/IUserRepo';
import { GetUserByIdErrors } from '../../../../users/useCases/getUserById/GetUserByIdErrors';
import { ReportType } from '../../../domain/ReportType';
import { ReportStatus } from '../../../domain/ReportStatus';
import { IReportTypeRepo } from '../../../repo/IReportTypeRepo';
import { IReportStatusRepo } from '../../../repo/IReportStatusRepo';
import { ReportName } from '../../../domain/ReportName';
import { VolumeFactor } from '../../../../usersSettings/domain/VolumeFactor';
import { DiameterFactor } from '../../../../usersSettings/domain/DiameterFactor';
import { ReportSettings } from '../../../domain/ReportSettings';

export type Response = Either<GetUserByIdErrors.IdNotFound | AppError.UnexpectedError, Result<Merged>>;

export class CreateMergedUseCase {
  public constructor(
    groupRepo: IMergedRepo,
    scanRepo: IScanRepo,
    reportTypeRepo: IReportTypeRepo,
    reportStatusRepo: IReportStatusRepo,
    userRepo: IUserRepo
  ) {
    this.groupRepo = groupRepo;
    this.scanRepo = scanRepo;
    this.reportTypeRepo = reportTypeRepo;
    this.reportStatusRepo = reportStatusRepo;
    this.userRepo = userRepo;
  }

  private groupRepo: IMergedRepo;

  private scanRepo: IScanRepo;

  private userRepo: IUserRepo;

  private reportTypeRepo: IReportTypeRepo;

  private reportStatusRepo: IReportStatusRepo;

  public async execute(dto: CreateMergedDTO): Promise<Response> {
    let scans: Scan[];
    let group: Merged;
    let reportType: ReportType;
    let reportStatus: ReportStatus;
    let user: User;

    if (dto.userId !== dto.decodedUserId) {
      return left(new GetUserByIdErrors.IdNotFound()) as Response;
    }

    try {
      try {
        user = await this.userRepo.getById(dto.userId);
      } catch (err) {
        return left(new GetUserByIdErrors.IdNotFound());
      }

      try {
        scans = await Promise.all(dto.scanId.map((scanId) => this.scanRepo.getById(scanId)));
      } catch (err) {
        return left(new CreateMergedErrors.IdReportsNotFound(dto.scanId)) as Response;
      }

      try {
        reportStatus = await this.reportStatusRepo.findByDescription('active');
      } catch (err) {
        return left(new AppError.UnexpectedError('Failed to find report status.'));
      }

      try {
        reportType = await this.reportTypeRepo.findByDescription('group');
      } catch (err) {
        return left(new AppError.UnexpectedError('Failed to find report type.'));
      }

      const volumeFactorOrError = VolumeFactor.create({ value: dto.reportSettings.volumeFactor });
      const diameterFactorOrError = DiameterFactor.create({ value: dto.reportSettings.diameterFactor });
      const appVersionOrError = AppVersion.create({ value: dto.appVersion });
      const deviceOrError = Device.create({ value: dto.device });
      const additionalInformationOrError = AdditionalInformation.create({ value: dto.additionalInformation });
      const originalTimezoneOrError = OriginalTimezone.create({ value: dto.originalTimezone });
      const originalCreationDateOrError = OriginalCreationDate.create({ value: new Date(dto.originalCreationDate) });
      const reportNameOrError = ReportName.create({ value: dto.reportName });
      const dtoResult = Result.combine([
        volumeFactorOrError,
        diameterFactorOrError,
        reportNameOrError,
        appVersionOrError,
        deviceOrError,
        additionalInformationOrError,
        originalTimezoneOrError,
        originalCreationDateOrError,
      ]);

      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
      }

      const volumeFactor: VolumeFactor = volumeFactorOrError.getValue();
      const diameterFactor: DiameterFactor = diameterFactorOrError.getValue();
      const reportSettingsOrError = ReportSettings.create({
        volumeFactor,
        diameterFactor,
      });

      if (reportSettingsOrError.isFailure) {
        return left(Result.fail<void>(reportSettingsOrError.getErrorValue())) as Response;
      }

      const appVersion: AppVersion = appVersionOrError.getValue();
      const device: Device = deviceOrError.getValue();
      const additionalInformation: AdditionalInformation = additionalInformationOrError.getValue();
      const reportName: ReportName = reportNameOrError.getValue();
      const originalCreationDate: OriginalCreationDate = originalCreationDateOrError.getValue();
      const originalTimezone: OriginalTimezone = originalTimezoneOrError.getValue();
      const mergedOrError = Merged.create({
        reportSettings: reportSettingsOrError.getValue(),
        scansId: scans.map((scan) => scan.reportId),
        reportType,
        reportStatus,
        reportName,
        userId: user.userId,
        appVersion,
        device,
        additionalInformation,
        originalTimezone,
        originalCreationDate,
      });

      if (mergedOrError.isFailure) {
        return left(Result.fail<void>(mergedOrError.getErrorValue())) as Response;
      }

      group = mergedOrError.getValue();
      await this.groupRepo.save(group);

      return right(Result.ok<Merged>(await this.groupRepo.getById(group.id.toString())));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
