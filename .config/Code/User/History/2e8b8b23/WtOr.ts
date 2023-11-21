import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IDomainEvent } from '../../../shared/domain/events/IDomainEvent';
import { log } from '../../../shared/utils/bunyan/log';
import { UserRefreshedEmailConfirmationToken } from '../../users/domain/events/UserRefreshedEmailConfirmationToken';
import { SendEmailResetPasswordTokenUseCase } from '../useCases/sendEmailResetPasswordToken/SendEmailResetPasswordTokenUseCase';
import { UserCreatedResetPasswordToken } from '../../users/domain/events/UserCreatedResetPasswordToken';
import { SendEmailResetPasswordTokenDTO } from '../useCases/sendEmailResetPasswordToken/SendEmailResetPasswordDTO';

export class AfterUserCreatedResetPasswordToken
  implements IHandle<UserRefreshedEmailConfirmationToken>
{
  private useCase: SendEmailResetPasswordTokenUseCase;

  constructor(useCase: SendEmailResetPasswordTokenUseCase) {
    this.useCase = useCase;
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    log.debug(
      { context: 'DomainEvent', eventName: 'onUserCreatedResetPasswordToken' },
      'Subscribing to event.'
    );
    DomainEvents.register(
      this.onUserCreatedResetPasswordToken.bind(this),
      UserCreatedResetPasswordToken.name
    );
  }

  private async onUserCreatedResetPasswordToken(event: IDomainEvent): Promise<void> {
    if (event instanceof UserCreatedResetPasswordToken) {
      try {
        await this.useCase.execute({ email: event.user.email } as SendEmailResetPasswordTokenDTO);
        log.info(
          `[AfterUserCreatedResetPasswordToken]: Sent email with password reset token for ${event.user.email.value}`
        );
      } catch (err) {
        log.info(
          `[AfterUserCreatedResetPasswordToken]: Failed send email to ${event.user.email.value}`
        );
      }
    }
  }
}
