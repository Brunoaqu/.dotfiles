class KnexReportRepository {
  knex;

  constructor(knex) {
    this.knex = knex;
  }

  async get(filters) {
    const query = this.knex('Reports')
      .innerJoin('Scans', 'Scans.reportId', 'Reports.reportId')
      .innerJoin('user_account as ua', 'ua.reg_id', 'Reports.userId')
      .innerJoin('user_login_data as uld', 'uld._id_registration_data', 'Reports.userId')
      .select([
        'user_account.reg_id AS _id_registration_data',
        'user_account.name',
        'user_account.enterprise_name AS enterprise_name',
        'user_account.phone',
        'user_account.cpf as doc',
        'user_login_data.email_address as email',
        'Reports.reportId AS _id_report',
        'Reports.counter AS report_number',
        'Reports.additionalInformation',
        'Reports.originalCreationDate',
        'Scans.specieFound',
        'Scans.length',
        'Scans.latitude',
        'Scans.longitude',
        'Scans.volume',
        'Scans.volumeFormula',
        'Scans.durationInSec',
      ])
      .orderBy('Reports.original_creation_date', 'desc');

    if (filters.start) {
      query.where('r.original_creation_date', '>=', filters.start);
    }

    if (filters.end) {
      query.where('r.original_creation_date', '<=', filters.end);
    }

    if (filters.name) {
      query.where('ua.name', 'like', `%${filters.name}%`);
    }

    if (filters.doc) {
      query.where('ua.cpf', 'like', `%${filters.doc}%`);
    }

    if (filters.specie) {
      query.where('s.specie_found', 'like', `%${filters.specie}%`);
    }

    if (filters.enterprise_name) {
      query.where('ua.enterprise_name', 'like', `%${filters.enterprise_name}%`);
    }

    const reports = await query;

    await Promise.all(
      reports.map(async (report) => {
        const logs = await this.knex('logs')
          .select(this.knex.raw('(height + width) / 2 AS diameter'))
          .where({ report_id: report._id_report });

        report.logs = logs.map((log) => log.diameter).join(';');
      })
    );

    return reports;
  }
}

module.exports = { KnexReportRepository };
