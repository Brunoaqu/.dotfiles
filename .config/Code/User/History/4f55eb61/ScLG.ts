export interface IRedisCacheService {
  saveRequestBody(path: string, userId: string, xRequestId: string, body: string): Promise<any>;
}
