import { Response } from 'express';
import { CreateScanDTO } from './CreateScanDTO';
import { ScanMapper } from '../../../mappers/ScanMapper';
import { CreateScanErrors } from './CreateScanErrors';
import { CreateScanUseCase } from './CreateScanUseCase';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { DTOHelper } from '../../../../../shared/core/DTOHelper';

export class CreateScanController extends BaseController {
  private useCase: CreateScanUseCase;

  constructor(useCase: CreateScanUseCase) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl(req: DecodedExpressRequest, res: Response): Promise<any> {
    const dto: CreateScanDTO = DTOHelper.serializeJSON(CreateScanDTO, {
      ...req.body,
      userId: req.decoded.userId,
      clientToken: req.get('x-client-token'),
    });
    const errors = await DTOHelper.validateSerializedJSON(dto);

    if (errors.length > 0) {
      return this.unprocessableEntity(res, errors);
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case CreateScanErrors.ScanExceedCredits:
            return this.unprocessableEntity(res, result.value.getErrorValue());
          default:
            return this.fail(res, result.value.getErrorValue());
        }
      }

      return this.created(res, ScanMapper.toDTO(result.value.getValue()));
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
