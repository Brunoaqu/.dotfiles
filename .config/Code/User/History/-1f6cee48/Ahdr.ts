import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { SendEmailTokenConfirmationUseCase } from '../useCases/sendEmailTokenConfirmation/SendEmailTokenConfirmationUseCase';
import { IDomainEvent } from '../../../shared/domain/events/IDomainEvent';
import { log } from '../../../shared/utils/bunyan/log';
import { UserRefreshedEmailConfirmationToken } from '../../users/domain/events/UserRefreshedEmailConfirmationToken';

export class AfterUserRefreshedEmailConfirmationToken
  implements IHandle<UserRefreshedEmailConfirmationToken>
{
  private sendEmailTokenConfirmationUseCase: SendEmailTokenConfirmationUseCase;

  constructor(sendEmailTokenConfirmationUseCase: SendEmailTokenConfirmationUseCase) {
    this.sendEmailTokenConfirmationUseCase = sendEmailTokenConfirmationUseCase;
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    log.debug('[AfterUserRefreshedEmailConfirmationToken]: Subscribing to event...');
    DomainEvents.register(
      this.onUserRefreshedEmailConfirmationToken.bind(this),
      UserRefreshedEmailConfirmationToken.name
    );
  }

  private async onUserRefreshedEmailConfirmationToken(event: IDomainEvent): Promise<void> {
    if (event instanceof UserRefreshedEmailConfirmationToken) {
      try {
        await this.sendEmailTokenConfirmationUseCase.execute({ email: event.user.email });
        log.info(
          `[AfterUserRefreshedEmailConfirmationToken]: Sent email with confirmation token for ${event.user.email.value}`
        );
      } catch (err) {
        log.info(
          `[AfterUserRefreshedEmailConfirmationToken]: Failed to update post stats for ${event.user.email.value}`
        );
      }
    }
  }
}
