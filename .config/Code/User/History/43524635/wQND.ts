import { NextFunction, Response } from 'express';
import { IRedisCacheService } from '../../../services/IRedisCacheService';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';

export class CacheMiddleware {
  public constructor(redisCacheService: IRedisCacheService) {
    this.redisCacheService = redisCacheService;
  }

  private redisCacheService: IRedisCacheService;

  public handle() {
    return async (req: any, res: Response, next: NextFunction) => {
      next();
      req.log.debug('Attempting to save request body to cache.');
      try {
        await this.redisCacheService.saveRequestBody(
          req.originalUrl,
          req.decoded.userId,
          req.get('x-request-id'),
          JSON.stringify(req.body)
        );
        req.log.debug('Successfully saved request body to cache.');
      } catch (err) {
        req.log.error({ err }, 'CacheMiddleware failed with unknown error');
      }
    };
  }
}
