import { AbstractRedisClient } from './AbstractRedisClient';

export class RedisCacheService extends AbstractRedisClient {
  private constructKey(userId: string, xRequestId: string): string {
    return `${userId}`;
  }

  public addClientToken(clientToken: string, userId: string, state: string): Promise<any> {
    return this.set(this.constructKey(clientToken, userId), state);
  }
}
