import { app } from '../../../src/shared/infra/http/app';

describe('Feature: User Registration', () => {
  it('POST_Users_Returns_201_CREATED', async () => {
    const res = await request(app)
      .post('/v1/users')
      .send({
        name: 'Pixlog Developer',
        enterpriseName: 'Pixlog LTDA',
        doc: '123.456.789-09',
        phone: '+55 (11) 99999-9999',
        emailAddress: 'pixlogtesting@pixlog.com.br',
        password: '12345678',
        physicalAddress: {
          level2long: 'Curitiba',
        },
      });

    res.status.should.be.equal(201);
    done();
  });
});
