import { redisCacheService } from '../../services';
import { CacheMiddleware } from './utils/CacheMiddleware';

const cacheMiddleware = new CacheMiddleware(redisCacheService);
