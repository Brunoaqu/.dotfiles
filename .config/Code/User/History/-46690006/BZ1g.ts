describe('Client registration feature', () => {
  it('should create a user', () => {
    request(app).post('/users').send({});
  });
});
