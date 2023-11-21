import { app } from '../../../src/shared/infra/http/app';

describe('Client registration feature', () => {
  it('POST_User_Returns_201_CREATED', () => {
    request(app).post('/v1/users').send({});
  });
});
