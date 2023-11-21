import { AbstractRedisClient } from './AbstractRedisClient';

export class RedisCacheService extends AbstractRedisClient {
  private constructKey(path: string, userId: string, xRequestId: string): string {
    return `${userId}`;
  }

  public async saveRequestBody(
    path: string,
    userId: string,
    xRequestId: string,
    body: any
  ): Promise<any> {
    return await this.set(this.constructKey(path, userId, xRequestId), body);
  }
}
