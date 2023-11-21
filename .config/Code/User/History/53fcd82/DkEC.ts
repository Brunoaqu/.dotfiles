import { RedisCacheService } from './ioredis/RedisCacheService';

const redisCacheService = new RedisCacheService(client);

export { redisCacheService };
