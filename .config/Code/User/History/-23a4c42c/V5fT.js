class KnexReportRepository {
  knex;

  constructor(knex) {
    this.knex = knex;
  }

  async get(filters) {
    const query = this.knex('Reports')
      .innerJoin('Scans', 'Reports.reportId', 'Scans.reportId')
      .innerJoin('user_account', 'Reports.userId', 'user_account.reg_id')
      .innerJoin('user_login_data', 'Reports.userId', 'user_login_data._id_registration_data')
      .select([
        'user_account.reg_id AS _id_registration_data',
        'user_account.name AS name',
        'user_account.enterprise_name AS enterprise_name',
        'user_account.phone AS phone',
        'user_account.cpf as doc',
        'user_login_data.email_address as email',
        'Reports.reportId AS _id_report',
        'Reports.counter AS report_number',
        'Reports.additionalInformation AS additional_information',
        'Reports.originalCreationDate AS original_creation_date',
        'Scans.specieFound AS specie_found',
        'Scans.pileLength AS length',
        'Scans.latitude AS latitude',
        'Scans.longitude AS longitude',
        'Scans.volume AS volume',
        'Scans.volumeFormula AS volume_formula',
        'Scans.durationInSec AS duration_in_sec',
      ])
      .orderBy('Reports.originalCreationDate', 'desc');

    if (!!filters.start) query.where('Reports.originalCreationDate', '>=', filters.start);
    if (!!filters.end) query.where('Reports.originalCreationDate', '<=', filters.end);
    if (!!filters.doc) query.where('user_account.cpf', 'like', `%${filters.doc}%`);
    if (!!filters.name) query.whereRaw("user_account.name LIKE '%??%'", [filters.name]);
    if (!!filters.specie) query.whereRaw("Scans.specieFound LIKE '%??%'", [filters.specie]);
    if (!!filters.enterprise_name) query.where("user_account.enterpriseName LIKE '%??%'", [filters.enterprise_name]);

    const reports = await query;

    await Promise.all(
      reports.map(async (report) => {
        const logs = await this.knex('WoodLogs')
          .where({ reportId: report.reportId })
          .select(this.knex.raw('(WoodLogs.height + WoodLogs.width) / 2').as('diameter'));

        report.logs = logs.map((log) => log.diameter).join(';');
      })
    );

    return reports;
  }
}

module.exports = { KnexReportRepository };
