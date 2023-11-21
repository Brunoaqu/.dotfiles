import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IDomainEvent } from '../../../shared/domain/events/IDomainEvent';
import { log } from '../../../shared/utils/bunyan/log';
import { UserDeleted } from '../../users/domain/events/UserDeleted';
import { DeleteAllMergedUseCase } from '../useCases/merged/deleteAllMerged/DeleteAllMergedUseCase';
import { DeleteAllScansUseCase } from '../useCases/scan/deleteAllScans/DeleteAllScansUseCase';

export class AfterUserDeleted {
  private deleteAllScansUseCase: DeleteAllScansUseCase;

  private deleteAllMergedUseCase: DeleteAllMergedUseCase;

  constructor(
    deleteAllScansUseCase: DeleteAllScansUseCase,
    deleteAllMergedUseCase: DeleteAllMergedUseCase
  ) {
    this.deleteAllScansUseCase = deleteAllScansUseCase;
    this.deleteAllMergedUseCase = deleteAllMergedUseCase;
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    log.debug({ context: 'DomainEvent', eventName: 'onUserDeleted' }, 'Subscribing to event.');
    DomainEvents.register(this.onUserDeleted.bind(this), UserDeleted.name);
  }

  private async onUserDeleted(event: IDomainEvent): Promise<void> {
    if (event instanceof UserDeleted) {
      try {
        await this.deleteAllMergedUseCase.execute({ userId: event.user.userId });
        log.info(
          `[AfterUserDeleted]: Deleted all merged for user ${event.user.userId.getStringValue()}`
        );
      } catch (err) {
        log.info(
          `[AfterUserDeleted]: Failed to delete all merged for user ${event.user.userId.getStringValue()}`,
          err
        );
      }

      try {
        await this.deleteAllScansUseCase.execute({ userId: event.user.userId });
        log.info(
          `[AfterUserDeleted]: Deleted all scans for user ${event.user.userId.getStringValue()}`
        );
      } catch (err) {
        log.info(
          `[AfterUserDeleted]: Failed to delete all scans for user ${event.user.userId.getStringValue()}`
        );
      }
    }
  }
}
