export interface IRedisCacheService {
  saveRequestBody(userId: string, xRequestId: string, body: string): Promise<any>;
}
