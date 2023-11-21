// const { connection } = require('../src/config/knex');

// async function clearDatabase() {
//   const t = await connection.transaction();

//   try {
//     await connection.raw('SET foreign_key_checks=0').transacting(t);

//     await Promise.all([
//       connection('address').delete().transacting(t),
//       connection('credit_record').delete().transacting(t),
//       connection('debug').delete().transacting(t),
//       connection('email_verification').delete().transacting(t),
//       connection('emergency_access').delete().transacting(t),
//       connection('feedback').delete().transacting(t),
//       connection('internal_user').delete().transacting(t),
//       connection('invitation').delete().transacting(t),
//       connection('login').delete().transacting(t),
//       connection('logs').delete().transacting(t),
//       connection('permission').delete().transacting(t),
//       connection('persistent_information').delete().transacting(t),
//       connection('receipt').delete().transacting(t),
//       connection('registration_data').delete().transacting(t),
//       connection('report').delete().transacting(t),
//       connection('report_address').delete().transacting(t),
//       connection('report_type').delete().transacting(t),
//       connection('report_wrapped').delete().transacting(t),
//       connection('report_wrapped_transaction').delete().transacting(t),
//       connection('scan').delete().transacting(t),
//       connection('session').delete().transacting(t),
//     ]);

//     await connection.raw('SET foreign_key_checks=1').transacting(t);
//     await t.commit();
//   } catch (error) {
//     await t.rollback();
//   }
// }

// async function destroyConnection(connection) {
//   await connection.destroy();
// }

// module.exports.mochaHooks = {
//   afterEach() {
//     return new Promise(function (resolve, reject) {
//       clearDatabase()
//         .then(() => resolve())
//         .catch((error) => reject(error));
//     });
//   },

//   afterAll() {
//     return new Promise(function (resolve, reject) {
//       destroyConnection(connection)
//         .then(() => resolve())
//         .catch((error) => reject(error));
//     });
//   },
// };
