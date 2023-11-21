import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { SendEmailTokenConfirmationUseCase } from '../useCases/sendEmailTokenConfirmation/SendEmailTokenConfirmationUseCase';
import { IDomainEvent } from '../../../shared/domain/events/IDomainEvent';
import { log } from '../../../shared/utils/bunyan/log';
import { UserCreated } from '../../users/domain/events/UserCreated';

export class AfterUserCreated implements IHandle<UserCreated> {
  private sendEmailTokenConfirmationUseCase: SendEmailTokenConfirmationUseCase;

  constructor(sendEmailTokenConfirmationUseCase: SendEmailTokenConfirmationUseCase) {
    this.sendEmailTokenConfirmationUseCase = sendEmailTokenConfirmationUseCase;
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    log.debug({ context: 'DomainEvent', eventName: 'onUserCreated' }, 'Subscribing to event.');
    DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name);
  }

  private async onUserCreated(event: IDomainEvent): Promise<void> {
    if (event instanceof UserCreated) {
      try {
        await this.sendEmailTokenConfirmationUseCase.execute(event.user);
        log.info(
          `[AfterUserCreated]: Sent email with confirmation token for ${event.user.email.value}`
        );
      } catch (err) {
        log.info(`[AfterUserCreated]: Failed to update post stats for ${event.user.email.value}`);
      }
    }
  }
}
