const { nanoid } = require('nanoid');

class AddCreditsUseCase {
  constructor(KnexRepository) {
    this.knexRepository = KnexRepository;
  }

  async execute(dto) {
    try {
      await this.knexRepository.addCredits({
        transactionId: nanoid(),
        userId: dto.reg_data_id,
        credit: dto.credit,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = { AddCreditsUseCase };
