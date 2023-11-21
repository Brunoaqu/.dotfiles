const { map } = require('lodash');

class KnexRepository {
  knex;

  constructor(knex) {
    this.knex = knex;
  }

  async getReport(_id_report, reg_id) {
    const userAccount = await this.knex('user_account')
      .innerJoin('user_login_data', 'user_login_data._id_registration_data', 'user_account.reg_id')
      .andWhere('user_account.reg_id', reg_id)
      .select([
        'user_account.reg_id AS reg_id',
        'user_account.name AS name',
        'user_account.phone AS phone',
        'user_account.cpf AS doc',
        'user_login_data.email_address AS email',
      ]);

    return {
      ...(
        await this.knex('Reports')
          .innerJoin('Scans', 'Reports.reportId', 'Scans.reportId')
          .where('Reports.reportId', _id_report)
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
            'Scans.pileLength AS length',
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
      logs: await this.knex('WoodLogs')
        .andWhere('reportId', _id_report)
        .select([
          'WoodLogs.woodLogId AS log_id',
          'WoodLogs.',
          'WoodLogs.height AS height',
          'WoodLogs.width AS width'
        ]),
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
        .innerJoin('user_address', 'user_account.reg_id', 'user_address._id_registration_data')
        .andWhere('user_account.reg_id', userId)
        .select([
          'user_account.reg_id AS _id_registration_data',
          'user_account.cpf AS cpf',
          'user_account.name AS name',
          'user_login_data.email_address AS email',
          'user_account.enterprise_name AS enterprise_name',
          'user_account.phone AS phone',
          'user_address.level2long as city',
          'user_address.level1long as state',
          'user_account.created_at AS created_at',
        ]),
      this.knex('Transactions')
        .innerJoin('user_account', 'user_account.reg_id', 'Transactions.userId')
        .andWhere('Transactions.userId', userId)
        .orderBy('Transactions.createdAt', 'desc')
        .select([
          'Transactions.reportId as _id_report',
          'Transactions.balance as balance',
          'Transactions.createdAt as created_at',
          'user_account.cpf',
          this.knex.raw(
            "CAST(IFNULL(Transactions.credit, CONCAT('-', Transactions.debit)) AS DECIMAL(18,3)) AS 'credit'"
          ),
        ]),
    ]);

    return { ...user[0], transactions };
  }

  async getUsers(params) {
    const { limit, init, end, enterprise_name } = params;
    const query = this.knex('user_account')
      .innerJoin('user_login_data', 'user_account.reg_id', 'user_login_data._id_registration_data')
      .innerJoin('user_address', 'user_account.reg_id', 'user_address._id_registration_data')
      .leftJoin(
        this.knex('Transactions')
          .select('userId')
          .sum('debit AS total_spent_credits')
          .groupBy('userId')
          .as('UserTransactionInformation'),
        'user_account.reg_id',
        'UserTransactionInformation.userId'
      )
      .select([
        'user_account.reg_id AS reg_id',
        'user_account.cpf AS cpf',
        'user_account.name AS name',
        'user_account.created_at AS created_at',
        'user_account.enterprise_name AS enterprise_name',
        'user_account.phone AS phone',
        'user_login_data.email_address AS email',
        'user_address.level2long AS city',
        'user_address.level1long AS state',
        'UserTransactionInformation.total_spent_credits AS total_spent_credits',
      ]);

    if (!!enterprise_name) query.andWhere('user_account.enterprise_name', enterprise_name);
    if (!!init) query.andWhere('user_account.created_at', '>=', init);
    if (!!end) query.andWhere('user_account.created_at', '<=', end);
    if (!!limit) query.limit(limit);

    return await Promise.all(
      map(await query, async (user) => {
        const balanceInformation = await this.knex('Transactions')
          .andWhere('Transactions.userId', user.reg_id)
          .orderBy('Transactions.createdAt', 'desc')
          .limit(1)
          .select(['Transactions.balance AS current_credits', 'Transactions.createdAt AS last_balance_change']);

        return {
          ...user,
          ...balanceInformation[0],
        };
      })
    );
  }

  async addCredits(dto) {
    await this.knex('Transactions').insert(dto);
  }
}

module.exports = { KnexRepository };
