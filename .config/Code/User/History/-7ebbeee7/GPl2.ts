import { redisCacheService } from '../../services';
import { CacheMiddleware } from './utils/CacheMiddleware';

console.log('redisCacheService', redisCacheService);
const cacheMiddleware = new CacheMiddleware(redisCacheService);

export { cacheMiddleware };