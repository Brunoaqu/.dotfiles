import { NextFunction, Response } from 'express';
import { IRedisCacheService } from '../../../services/IRedisCacheService';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';

export class CacheMiddleware {
  public constructor(redisCacheService: IRedisCacheService) {
    this.redisCacheService = redisCacheService;
  }

  private redisCacheService: IRedisCacheService;

  public async handle(req: DecodedExpressRequest, res: Response, next: NextFunction) {
    next();
    req.log.debug('Attempting to save request body to cache', {
      body: req.body,
      userId: req.decoded.userId,
    });
    try {
      this.redisCacheService.saveRequestBody(req.decoded.userId, req.body, req.body);
    } catch (err) {
      req.log.error({ err }, 'CacheMiddleware failed with unknown error');
    }
  }
}
