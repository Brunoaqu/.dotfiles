import { Redis } from 'ioredis';

export abstract class AbstractRedisClient {
  public constructor(client: Redis) {
    this.client = client;
  }

  protected client: Redis;

  public async set(key: string, value: any): Promise<any> {
    return await this.client.call('JSON.SET', 'doc', '$', JSON.stringify(value));
  }
}