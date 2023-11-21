import { Redis } from 'ioredis';

export abstract class AbstractRedisClient {
  public constructor(client: Redis) {
    this.client = client;
  }

  protected client: Redis;

  public async set(key: string, value: string): Promise<any> {
    return await this.client.set('mykey', 'hello', 'EX', 10);
    //   this.client.set(key, value, (err, reply) => {
    //     if (err) {
    //       return reject(err);
    //     }

    //     this.client.expire(key, 300000);
    //     return resolve(reply);
    //   });
  }
}
