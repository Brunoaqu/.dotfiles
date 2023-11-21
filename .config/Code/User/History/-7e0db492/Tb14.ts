import { log } from '../utils/bunyan/log';
import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        Errors: [
          {
            name: 'ERR_UNEXPECTED',
            details: err,
          },
        ],
      } as UseCaseError);

      log.error({ err }, 'An unexpected error occurred.');
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
