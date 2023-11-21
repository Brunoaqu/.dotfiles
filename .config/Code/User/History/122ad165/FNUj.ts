import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IDomainEvent } from '../../../shared/domain/events/IDomainEvent';
import { log } from '../../../shared/utils/bunyan/log';
import { ScanReportCreated } from '../../reports/domain/events/ScanReportCreated';
import { ChargeScanUseCase } from '../useCases/chargeScan/ChargeScanUseCase';

export class AfterScanCreated {
  private chargeScanUseCase: ChargeScanUseCase;

  constructor(chargeScanUseCase: ChargeScanUseCase) {
    this.chargeScanUseCase = chargeScanUseCase;
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    log.debug({ context: 'DomainEvent', eventName: 'onScanCreated' }, 'Subscribing to event.');
    DomainEvents.register(this.onScanCreated.bind(this), ScanReportCreated.name);
  }

  private async onScanCreated(event: IDomainEvent): Promise<void> {
    if (event instanceof ScanReportCreated) {
      try {
        await this.chargeScanUseCase.execute({
          userId: event.report.userId,
          reportId: event.report.reportId,
        });
        log.info(
          `[AfterScanCreated]: Successfully charged the scan: ${event.report.reportId.getStringValue()}.`
        );
      } catch (err) {
        log.info(
          `[AfterScanCreated]: Failed to charge the scan: ${event.report.reportId.getStringValue()}.`,
          err
        );
      }
    }
  }
}
