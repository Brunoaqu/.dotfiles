import { CreateScanErrors } from './CreateScanErrors';
import { DurationInSec } from '../../../domain/DurationInSec';
import { Latitude } from '../../../domain/Latitude';
import { Longitude } from '../../../domain/Longitude';
import { Volume } from '../../../domain/Volume';
import { VolumeFormula } from '../../../domain/VolumeFormula';
import { SpecieFound } from '../../../domain/SpecieFound';
import { PileLength } from '../../../domain/PileLength';
import { AdditionalInformation } from '../../../domain/AdditionalInformation';
import { OriginalTimezone } from '../../../domain/OriginalTimezone';
import { OriginalCreationDate } from '../../../domain/OriginalCreationDate';
import { WoodLogName } from '../../../domain/WoodLogName';
import { Width } from '../../../domain/Width';
import { Height } from '../../../domain/Height';
import { Confiability } from '../../../domain/Confiability';
import { Scan } from '../../../domain/Scan';
import { CreateScanDTO } from './CreateScanDTO';
import { SortingMin } from '../../../domain/SortingMin';
import { SortingMax } from '../../../domain/SortingMax';
import { IScanRepo } from '../../../repo/IScanRepo';
import { AppVersion } from '../../../domain/AppVersion';
import { ScarfVersion } from '../../../domain/ScarfVersion';
import { Device } from '../../../domain/Device';
import { UseCase } from '../../../../../shared/core/UseCase';
import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { IUserRepo } from '../../../../users/repo/IUserRepo';
import { ITransactionRepo } from '../../../../transactions/repo/ITransactionRepo';
import { User } from '../../../../users/domain/User';
import { Transaction } from '../../../../transactions/domain/Transaction';
import { GetUserByIdErrors } from '../../../../users/useCases/getUserById/GetUserByIdErrors';
import { Area } from '../../../domain/Area';
import { Frame } from '../../../domain/Frame';
import { AvgFrameVolume } from '../../../domain/AvgFrameVolume';
import { IReportStatusRepo } from '../../../repo/IReportStatusRepo';
import { ReportStatus } from '../../../domain/ReportStatus';
import { ReportType } from '../../../domain/ReportType';
import { IReportTypeRepo } from '../../../repo/IReportTypeRepo';
import { PileWidth } from '../../../domain/PileWidth';
import { PileHeight } from '../../../domain/PileHeight';
import { ReportName } from '../../../domain/ReportName';

export type Response = Either<CreateScanErrors.ScanExceedCredits | AppError.UnexpectedError, Result<Scan>>;

export class CreateScanUseCase implements UseCase<CreateScanDTO, Promise<Response>> {
  public constructor(
    scanRepo: IScanRepo,
    reportTypeRepo: IReportTypeRepo,
    reportStatusRepo: IReportStatusRepo,
    userRepo: IUserRepo,
    transactionRepo: ITransactionRepo
  ) {
    this.scanRepo = scanRepo;
    this.reportTypeRepo = reportTypeRepo;
    this.reportStatusRepo = reportStatusRepo;
    this.userRepo = userRepo;
    this.transactionRepo = transactionRepo;
  }

  private scanRepo: IScanRepo;

  private reportTypeRepo: IReportTypeRepo;

  private reportStatusRepo: IReportStatusRepo;

  private userRepo: IUserRepo;

  private transactionRepo: ITransactionRepo;

  public async execute(dto: CreateScanDTO): Promise<Response> {
    let user: PromiseSettledResult<User>;
    let report: Scan;
    let reportStatus: PromiseSettledResult<ReportStatus>;
    let reportType: PromiseSettledResult<ReportType>;
    let transaction: PromiseSettledResult<Transaction[]>;

    try {
      [user, reportStatus, reportType, transaction] = await Promise.allSettled([
        this.userRepo.getById(dto.userId),
        this.reportStatusRepo.findByDescription('active'),
        this.reportTypeRepo.findByDescription('framelog'),
        this.transactionRepo.findAllByUserId(dto.userId, {
          page: 1,
          perPage: 1,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        }),
      ]);

      if (user.status === 'rejected') {
        return left(new GetUserByIdErrors.IdNotFound());
      }

      if (reportStatus.status === 'rejected') {
        return left(new AppError.UnexpectedError(reportStatus.reason));
      }

      if (reportType.status === 'rejected') {
        return left(new AppError.UnexpectedError(reportType.reason));
      }

      if (transaction.status === 'rejected') {
        return left(new AppError.UnexpectedError(transaction.reason));
      }

      const

      const appVersionOrError = AppVersion.create({ value: dto.appVersion });
      const scarfVersionOrError = ScarfVersion.create({ value: dto.scarfVersion });
      const deviceOrError = Device.create({ value: dto.device });
      const durationInSecOrError = DurationInSec.create({ value: dto.durationInSec });
      const latitudeOrError = Latitude.create({ value: dto.latitude });
      const longitudeOrError = Longitude.create({ value: dto.longitude });
      const volumeOrError = Volume.create({ value: dto.volume });
      const volumeFormulaOrError = VolumeFormula.create({ value: dto.volumeFormula });
      const specieFoundOrError = SpecieFound.create({ value: dto.specieFound });
      const pileLengthOrError = PileLength.create({ value: dto.pileLength });
      const pileWidthOrError = PileWidth.create({ value: dto.pileWidth });
      const pileHeightOrError = PileHeight.create({ value: dto.pileHeight });
      const additionalInformationOrError = AdditionalInformation.create({ value: dto.additionalInformation });
      const reportNameOrError = ReportName.create({ value: dto.reportName });
      const originalTimezoneByOrError = OriginalTimezone.create({ value: dto.originalTimezone });
      const originalCreationDateOrError = OriginalCreationDate.create({ value: new Date(dto.originalCreationDate) });
      const sortingMinOrError = SortingMin.create({ value: dto.sortingMin });
      const sortingMaxOrError = SortingMax.create({ value: dto.sortingMax });
      const areaOrError = Area.create({ value: dto.area });
      const avgFrameVolumeOrError = AvgFrameVolume.create({ value: dto.avgFrameVolume });
      const dtoResult = Result.combine([
        appVersionOrError,
        scarfVersionOrError,
        deviceOrError,
        durationInSecOrError,
        latitudeOrError,
        longitudeOrError,
        volumeOrError,
        volumeFormulaOrError,
        specieFoundOrError,
        pileLengthOrError,
        pileWidthOrError,
        pileHeightOrError,
        additionalInformationOrError,
        originalTimezoneByOrError,
        originalCreationDateOrError,
        sortingMinOrError,
        sortingMaxOrError,
        areaOrError,
        avgFrameVolumeOrError,
        reportNameOrError,
      ]);

      if (dtoResult.isFailure) {
        return left(Result.fail<any>(dtoResult.getErrorValue()));
      }

      const appVersion: AppVersion = appVersionOrError.getValue();
      const scarfVersion: ScarfVersion = scarfVersionOrError.getValue();
      const device: Device = deviceOrError.getValue();
      const durationInSec: DurationInSec = durationInSecOrError.getValue();
      const latitude: Latitude = latitudeOrError.getValue();
      const longitude: Longitude = longitudeOrError.getValue();
      const volume: Volume = volumeOrError.getValue();
      const volumeFormula: VolumeFormula = volumeFormulaOrError.getValue();
      const specieFound: SpecieFound = specieFoundOrError.getValue();
      const pileLength: PileLength = pileLengthOrError.getValue();
      const pileWidth: PileWidth = pileWidthOrError.getValue();
      const pileHeight: PileHeight = pileHeightOrError.getValue();
      const additionalInformation: AdditionalInformation = additionalInformationOrError.getValue();
      const originalTimezone: OriginalTimezone = originalTimezoneByOrError.getValue();
      const originalCreationDate: OriginalCreationDate = originalCreationDateOrError.getValue();
      const sortingMin: SortingMin = sortingMinOrError.getValue();
      const sortingMax: SortingMax = sortingMaxOrError.getValue();
      const area: Area = areaOrError.getValue();
      const avgFrameVolume: Volume = avgFrameVolumeOrError.getValue();
      const reportName: ReportName = reportNameOrError.getValue();

      if (transaction.value.length === 0) {
        return left(new CreateScanErrors.ScanExceedCredits()) as Response;
      }

      if (Number(transaction.value[0].balance?.value) < Number(volume.value)) {
        return left(new CreateScanErrors.ScanExceedCredits()) as Response;
      }

      const reportOrError = Scan.create({
        userId: user.value.userId,
        reportType: reportType.value,
        reportStatus: reportStatus.value,
        appVersion,
        scarfVersion,
        device,
        additionalInformation,
        originalTimezone,
        originalCreationDate,
        durationInSec,
        latitude,
        longitude,
        volume,
        volumeFormula,
        specieFound,
        pileLength,
        pileWidth,
        pileHeight,
        sortingMin,
        sortingMax,
        area,
        avgFrameVolume,
        reportName,
        woodLogs: [],
      });

      if (reportOrError.isFailure) {
        return left(Result.fail<any>(reportOrError.getErrorValue()));
      }

      report = reportOrError.getValue();

      for (let i = 0; i < dto.woodLogs.length; i += 1) {
        const woodLogNameOrError = WoodLogName.create({ value: dto.woodLogs[i].woodLogName });
        const confiabilityOrError = Confiability.create({ value: dto.woodLogs[i].confiability });
        const heightOrError = Height.create({ value: dto.woodLogs[i].height });
        const widthOrError = Width.create({ value: dto.woodLogs[i].width });
        const frameOrError = Frame.create({ value: dto.woodLogs[i].frame });
        const dtoResult = Result.combine([woodLogNameOrError, confiabilityOrError, heightOrError, widthOrError, frameOrError]);

        if (dtoResult.isFailure) {
          return left(Result.fail(dtoResult.getErrorValue())) as Response;
        }

        const woodLogName: WoodLogName = woodLogNameOrError.getValue();
        const confiability: Confiability = confiabilityOrError.getValue();
        const height: Height = heightOrError.getValue();
        const width: Width = widthOrError.getValue();
        const frame: Frame = frameOrError.getValue();

        report.addLog({
          woodLogName,
          confiability,
          height,
          width,
          frame,
        });
      }

      await this.scanRepo.save(report);
      report = await this.scanRepo.getById(report.reportId);

      return right(Result.ok<Scan>(report)) as Response;
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
