// const { DateTime } = require('luxon');
// const { app } = require('../src/shared/infra/http/app');
// const { chai } = require('./chaiSetup');

// class ApiTestTools {
//   static agent = chai.request.agent(app);

//   static get loginHeader() {
//     return {
//       'device-model': 'IO-test',
//       'device-name': 'Tester',
//     };
//   }

//   static get onGetUser() {
//     return {
//       reg_id: 'id',
//       login_id: 'id',
//       name: 'Pixlog Backend Developer',
//       enterprise_name: 'Pixlog LTDA',
//       email: this.currentFileNameEmail,
//       phone: '(99) 9 9999-9999',
//       cpf: '123.456.789-09',
//       level2long: 'Curitiba',
//       feedback: null,
//       wallet: {
//         current_credits: 100,
//         last_credits: '2023-01-04T17:41:19.000Z',
//       },
//       workspace: [],
//       invitations: [],
//       free_trial_available: false,
//       reports: {
//         _ids_report: [],
//         _ids_report_wrapped: [],
//       },
//     };
//   }

//   static get userData() {
//     return {
//       login: {
//         email: this.currentFileNameEmail,
//         password: '12345678',
//       },
//       registration_data: {
//         name: 'Pixlog Backend Developer',
//         enterprise_name: 'Pixlog LTDA',
//         phone: '(99) 9 9999-9999',
//         cpf: '123.456.789-09',
//       },
//       address: {
//         level2long: 'Curitiba',
//       },
//     };
//   }

//   static get paymentData() {
//     return {
//       _id_credit_record: '_id_credit_record',
//       _id_registration_data: '_id_registration_data',
//       _id_report: '_id_report',
//       debit: null,
//       credit: 100,
//       balance: 100,
//       created_at: '2023-01-02T19:42:51.000Z',
//       isMalicious: 0,
//       is_trial: 0,
//     };
//   }

//   static get reportData() {
//     return {
//       additional_information: `Information: ${DateTime.now().toMillis().toString()}`,
//       original_timezone: '+0300',
//       original_creation_date: '2022-12-19T12:21:34.000Z',
//       scan_result: {
//         duration_in_sec: 522,
//         latitude: -25.4384481,
//         longitude: -49.2806612,
//         volume: 10,
//         volume_formula: 'MagiaNegra^2',
//         specie_found: 'pinus',
//         length: 3.1,
//         address: {
//           country: 'Brasil',
//           countryCode: 'BR',
//           zipcode: '80420-000',
//           level1short: 'PR',
//           level1long: 'Paraná',
//           level2short: 'Curitiba',
//           level2long: 'Curitiba',
//           neighborhood: 'Centro',
//           streetNumber: 565,
//           streetName: 'Rua Comendador Araújo',
//         },
//         logs: Array(100).fill({
//           log_name: '1',
//           confiability: 0.8903588200176159,
//           height: 0.28,
//           width: 0.28,
//           position_x: 0.12294983577131324,
//           position_y: 0.1432519030286129,
//         }),
//       },
//     };
//   }

//   static get mockedReceipt() {
//     return {
//       receipt: {
//         receipt_type: 'ProductionSandbox',
//         adam_id: 0,
//         app_item_id: 0,
//         bundle_id: 'br.com.apppixlog',
//         application_version: '1',
//         download_id: 0,
//         version_external_identifier: 0,
//         receipt_creation_date: '2022-11-09 18:43:46 Etc/GMT',
//         receipt_creation_date_ms: '1668019426000',
//         receipt_creation_date_pst: '2022-11-09 10:43:46 America/Los_Angeles',
//         request_date: '2023-01-03 17:04:52 Etc/GMT',
//         request_date_ms: '1672765492491',
//         request_date_pst: '2023-01-03 09:04:52 America/Los_Angeles',
//         original_purchase_date: '2013-08-01 07:00:00 Etc/GMT',
//         original_purchase_date_ms: '1375340400000',
//         original_purchase_date_pst: '2013-08-01 00:00:00 America/Los_Angeles',
//         original_application_version: '1.0',
//         in_app: [
//           {
//             quantity: '1',
//             product_id: 'semente',
//             transaction_id: '2000000198161049',
//             original_transaction_id: '2000000198161049',
//             purchase_date: '2022-11-09 18:43:46 Etc/GMT',
//             purchase_date_ms: '1668019426000',
//             purchase_date_pst: '2022-11-09 10:43:46 America/Los_Angeles',
//             original_purchase_date: '2022-11-09 18:43:46 Etc/GMT',
//             original_purchase_date_ms: '1668019426000',
//             original_purchase_date_pst: '2022-11-09 10:43:46 America/Los_Angeles',
//             is_trial_period: 'false',
//             in_app_ownership_type: 'PURCHASED',
//           },
//         ],
//       },
//       environment: 'Sandbox',
//       status: 0,
//     };
//   }

//   static get reportWrappedData() {
//     return {
//       additional_information: `Information: ${DateTime.now().toMillis().toString()}`,
//       original_timezone: '+0300',
//       original_creation_date: '2022-12-19T12:21:34.000Z',
//       _ids_report: ['aaaaaaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbbbbb', 'ccccccccccccccccccccc'],
//     };
//   }

//   static get currentFileNameEmail() {
//     Error.prepareStackTrace = (err, stack) => stack;
//     const err = new Error();

//     const files = [];
//     for (let i = 0; i <= err.stack.length - 1; i += 1) {
//       const filepath = String(err.stack[i].getFileName());
//       if (
//         !(filepath.includes('node:') || filepath.includes('node_modules')) &&
//         filepath !== 'null'
//       ) {
//         files.push(filepath);
//       }
//     }

//     const filename = files[files.length - 1].split('/').pop().replace('.js', '').toLowerCase();
//     return `${filename}@pixlog.com.br`;
//   }

//   static createAndConfirmUser() {
//     const { agent } = this;
//     const requestInput = this.userData;

//     return new Promise(function (resolve, reject) {
//       agent
//         .post('/v1/user')
//         .send(requestInput)
//         .end(function (err, res) {
//           if (err) {
//             reject(err);
//             return;
//           }

//           agent
//             .post('/v1/user/code')
//             .send({
//               email: requestInput.login.email,
//               verification_code: res.body.verification_code.toString(),
//             })
//             .end(function (err) {
//               if (err) {
//                 reject(err);
//                 return;
//               }

//               resolve();
//             });
//         });
//     });
//   }
// }

// module.exports = { ApiTestTools };
