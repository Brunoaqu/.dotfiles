import { Response } from 'express';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { CreateMergedErrors } from './CreateMergedErrors';
import { CreateMergedUseCase } from './CreateMergedUseCase';
import { CreateMergedDTO } from './CreateMergedDTO';
import { MergedMapper } from '../../../mappers/MergedMapper';
import { GetUserByIdErrors } from '../../../../users/useCases/getUserById/GetUserByIdErrors';
import { DTOHelper } from '../../../../../shared/core/DTOHelper';

export class CreateMergedController extends BaseController {
  private useCase: CreateMergedUseCase;

  constructor(useCase: CreateMergedUseCase) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl(req: DecodedExpressRequest, res: Response): Promise<any> {
    const dto: CreateMergedDTO = DTOHelper.serializeJSON(CreateMergedDTO, {
      ...req.body,
      decodedUserId: req.decoded.userId,
    });
    const dtoErrors = await DTOHelper.validateSerializedJSON(dto);

    if (dtoErrors.length > 0) {
      return this.unprocessableEntity(res, dtoErrors);
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case CreateMergedErrors.IdReportsNotFound:
            return this.unprocessableEntity(res, result.value.getErrorValue());
          case GetUserByIdErrors.IdNotFound:
            return this.notFound(res, result.value.getErrorValue());
          default:
            return this.fail(res, result.value.getErrorValue());
        }
      }

      return this.created(res, MergedMapper.toDTO(result.value.getValue()));
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
