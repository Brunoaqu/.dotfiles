import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { CreateUserErrors } from './CreateUserErrors';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserDTO } from './CreateUserDTO';
import { isProduction } from '../../../../config';
import { VerificationCodeMapper } from '../../mappers/VerificationCodeMapper';
import { Result } from '../../../../shared/core/Result';
import { DTOHelper } from '../../../../shared/core/DTOHelper';

export class CreateUserController extends BaseController {
  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  private useCase: CreateUserUseCase;

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: CreateUserDTO = DTOHelper.serializeJSON(CreateUserDTO, { ...req.body });
    const errors = await DTOHelper.validateSerializedJSON(dto);

    if (errors.length > 0) {
      return this.unprocessableEntity(res, errors);
    }

    try {
      const result: any = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateUserErrors.EmailAlreadyExists:
            return this.unprocessableEntity(res, error.getErrorValue());
          default:
            return this.fail(res, result.value.getErrorValue());
        }
      }

      return isProduction
        ? this.ok(res)
        : this.ok(res, VerificationCodeMapper.toDTO(result.value.getValue()));
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
