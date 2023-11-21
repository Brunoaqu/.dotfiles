import { AbstractRedisClient } from './AbstractRedisClient';

export class RedisCacheService extends AbstractRedisClient {
  private constructKey(userId: string, xRequestId: string): string {
    return `${userId}`;
  }

  public async saveRequestBody(clientToken: string, userId: string, state: string): Promise<any> {
    return await this.set(this.constructKey(clientToken, userId), state);
  }
}
