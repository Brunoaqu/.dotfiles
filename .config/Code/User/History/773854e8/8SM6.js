const { map } = require('lodash');

class KnexRepository {
  knex;

  constructor(knex) {
    this.knex = knex;
  }

  async getReport(_id_report, reg_id) {
    const userAccount = await this.knex('user_account')
      .innerJoin('user_login_data', 'user_login_data._id_registration_data', 'user_account.reg_id')
      .select([
        'user_account.reg_id AS reg_id',
        'user_account.name AS name',
        'user_account.phone AS phone',
        'user_account.cpf AS doc',
        'user_login_data.email_address AS email',
      ])
      .where('user_account.reg_id', reg_id);

    return {
      ...(
        await this.knex('Reports')
          .innerJoin('Scans', 'Reports.reportId', 'Scans.reportId')
          .where({ 'r._id_report': _id_report })
          .select([
            'Reports.reportId AS report_id',
            'Reports.counter AS report_number',
            'Reports.createdAt AS created_at',
            'Reports.originalCreationDate AS scanned_at',
            'Reports.additionalInformation AS additional_information',
            'Reports.userId AS created_by',
            'Scans.durationInSec AS duration_in_sec',
            'Scans.latitude AS latitude',
            'Scans.longitude AS longitude',
            'Scans.volume AS volume',
            'Scans.volumeFormula AS volume_formula',
            'Scans.specieFound AS specie_found',
            'Scans.length',
          ])
      )[0],
      user: userAccount,
      owner: userAccount,
      address: {
        country: null,
        countryCode: null,
        zipcode: null,
        level1short: null,
        level1long: null,
        level2short: null,
        level2long: null,
        neighborhood: null,
        streetNumber: null,
        streetName: null,
      },
      logs: await this.knex('WoodLogs').where('reportId', _id_report).select(),
    };
  }

  async getUserPassword(email) {
    const [password] = await this.knex('internal_user').select('password').where({ email });
    return password;
  }

  async getUserById(userId) {
    const [user, transactions] = await Promise.all([
      this.knex('user_account')
        .innerJoin('user_login_data', 'user_account.reg_id', 'user_login_data._id_registration_data')
        .innerJoin('user_address', 'user_account.reg_id', 'user_account._id_registration_data')
        .andWhere('user_account.reg_id', userId)
        .select([
          'user_account.reg_id AS _id_registration_data',
          'user_account.cpf AS cpf',
          'user_account.name AS name',
          'user_login_data.email_address AS email',
          'user_account.enterprise_name AS enterprise_name',
          'user_account.phone AS phone',
          'user_account.level2long as city',
          'user_account.level1long as state',
          'user_account.created_at AS created_at',
        ]),
      this.knex('Transactions')
        .innerJoin('user_account', 'user_account.reg_id', 'Transactions.userId')
        .andWhere('Transactions.userId', userId)
        .orderBy('Transactions.createdAt', 'desc')
        .select([
          'Transactions._id_report as _id_report',
          'Transactions.balance as balance',
          'Transactions.createdAt as created_at',
          'user_account.cpf',
          "CAST(IFNULL(Transactions.credit, CONCAT('-', Transactions.debit)) AS DECIMAL(18,3)) AS 'credit'",
        ]),
    ]);

    return { ...user[0], transactions };
  }

  async getUsers(params) {
    const { limit, init, end, enterprise_name } = params;
    const query = this.knex('user_account')
      .innerJoin('user_login_data', 'user_account.reg_id', 'user_login_data._id_registration_data')
      .innerJoin('user_address', 'user_account.reg_id', 'user_account._id_registration_data')
      .leftJoin(
        this.knex('Transactions')
          .select('userId AS _id_registration_data')
          .sum('debit AS total_spent_credits')
          .groupBy('userId')
          .as('utrs'),
        'user_account.reg_id',
        'utrs._id_registration_data'
      )
      .select([
        'user_account.reg_id AS reg_id',
        'user_account.cpf AS cpf',
        'user_account.name AS name',
        'user_account.created_at AS created_at',
        'user_account.enterprise_name AS enterprise_name',
        'user_account.phone AS phone',
        'user_account.level2long AS city',
        'user_account.level1long AS state',
        'user_login_data.email_address AS email',
        'utrs.total_spent_credits',
      ]);

    if (!!enterprise_name) query.andWhere('user_account.enterprise_name', enterprise_name);
    if (!!init) query.andWhere('user_account.created_at', '>=', init);
    if (!!end) query.andWhere('user_account.created_at', '<=', end);
    if (!!limit) query.limit(limit);

    const users = await query;
    const usersWithCreditInformation = await Promise.all(
      map(users, async (user) => {
        const balanceInformation = await this.knex('credit_record')
          .select(['balance AS current_credits', 'created_at AS last_balance_change'])
          .where({ _id_registration_data: user.reg_id })
          .orderBy('created_at', 'desc')
          .first();

        return {
          ...user,
          ...balanceInformation,
        };
      })
    );

    return usersWithCreditInformation;
  }

  async addCredits(dto) {
    await this.knex('Transactions').insert(dto);
  }
}

module.exports = { KnexRepository };
