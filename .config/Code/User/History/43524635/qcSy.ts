import { IRedisCacheService } from '../../../services/IRedisCacheService';

export class CacheMiddleware {
  public constructor(redisCacheService: IRedisCacheService) {
    this.redisCacheService = redisCacheService;
  }

  private redisCacheService: IRedisCacheService;
}
