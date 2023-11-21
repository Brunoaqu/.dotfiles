import { app } from '../../../src/shared/infra/http/app';

describe('POST_User', () => {
  it('should create a user', () => {
    request(app).post('/users').send({});
  });
});
