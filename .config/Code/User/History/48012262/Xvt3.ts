import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IDomainEvent } from '../../../shared/domain/events/IDomainEvent';
import { log } from '../../../shared/utils/bunyan/log';
import { UserDeleted } from '../../users/domain/events/UserDeleted';
import { ResetBalanceUseCase } from '../useCases/resetBalance/ResetBalanceUseCase';

export class AfterUserDeleted {
  private resetBalanceUseCase: ResetBalanceUseCase;

  constructor(resetBalanceUseCase: ResetBalanceUseCase) {
    this.resetBalanceUseCase = resetBalanceUseCase;
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    log.debug({ context: 'DomainEvent', eventName: 'onUserDeleted' }, 'Subscribing to event.');
    DomainEvents.register(this.onUserDeleted.bind(this), UserDeleted.name);
  }

  private async onUserDeleted(event: IDomainEvent): Promise<void> {
    if (event instanceof UserDeleted) {
      try {
        await this.resetBalanceUseCase.execute({ userId: event.user.userId });
        log.info(
          `[AfterUserDeleted]: Reset balance for user ${event.user.userId.getStringValue()}`
        );
      } catch (err) {
        log.info(
          `[AfterUserDeleted]: Failed to reset balance for user ${event.user.userId.getStringValue()}`,
          err
        );
      }
    }
  }
}
