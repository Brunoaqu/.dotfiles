import { Request, Response } from 'express';
import { log } from '../../../utils/bunyan/log';
import { UseCaseError } from '../../../core/UseCaseError';

export abstract class BaseController {
  protected abstract executeImpl(req: Request, res: Response): Promise<void | any>;

  public async execute(req: Request, res: Response): Promise<void> {
    try {
      req.log.debug(`[BaseController]: Executing ${this.constructor.name}.`);
      await this.executeImpl(req, res);
      req.log.debug(`[BaseController]: Executed ${this.constructor.name}.`);
    } catch (err) {
      req.log.error({ err }, 'Uncaught controller error');

      this.fail(res, 'An unexpected error occurred');
    }
  }

  public jsonResponse(res: Response, code: number, message: string | object) {
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    }

    return res.sendStatus(200);
  }

  public created<T>(res: Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(201).json(dto);
    }

    return res.sendStatus(201);
  }

  public noContent(res: Response) {
    return res.sendStatus(204);
  }

  public unauthorized(res: Response, message?: object) {
    return this.jsonResponse(res, 401, message || 'Unauthorized');
  }

  public forbidden(res: Response, message?: object) {
    return this.jsonResponse(res, 403, message || 'Forbidden');
  }

  public notFound(res: Response, message?: object) {
    return this.jsonResponse(res, 404, message || 'Not Found');
  }

  public conflict(res: Response, message?: object) {
    return this.jsonResponse(res, 409, message || 'Conflict');
  }

  public unprocessableEntity(res: Response, message?: object) {
    return this.jsonResponse(res, 422, message || 'Unprocessable entity');
  }

  public fail(res: Response, err: Error | UseCaseError | string) {
    log.error({ err });

    return res.status(500).json({
      Errors: [
        {
          name: 'ERR_UNEXPECTED',
          detail: 'An unexpected error occurred.',
        },
      ],
    });
  }
}
