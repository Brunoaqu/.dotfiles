import { app } from '../../../src/shared/infra/http/app';

describe('Client registration feature', () => {
  it('POST_User_Returns_201_CREATED', () => {
    request(app)
      .post('/v1/users')
      .send({
        name: 'Pixlog Developer',
        enterpriseName: 'Pixlog LTDA',
        doc: '123.456.789-09',
        phone: '{{$randomPhoneNumber}}',
        emailAddress: '{{EmailAddress}}',
        password: '{{Password}}',
        physicalAddress: {
          level2long: '{{$randomCity}}',
        },
      });
  });
});
