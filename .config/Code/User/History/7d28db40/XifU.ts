import { AbstractRedisClient } from './AbstractRedisClient';

export class RedisCacheService extends AbstractRedisClient {
  private constructKey(clientToken: string, userId: string): string {
    return `x-request-id:${userId}:${clientToken}`;
  }

  public addClientToken(clientToken: string, userId: string, state: string): Promise<any> {
    return this.set(this.constructKey(clientToken, userId), state);
  }

  public async getToken(clientToken: string, userId: string): Promise<string> {
    return this.getOne(this.constructKey(clientToken, userId));
  }
}