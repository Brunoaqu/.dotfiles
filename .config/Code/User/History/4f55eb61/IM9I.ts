export interface IRedisCacheService {
  handle(userId: string, xRequestId: string, body: string): Promise<any>;
}
