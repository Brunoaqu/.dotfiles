/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import chaiHttp from 'chai-http';
import chai from 'chai';
import chaiResponseValidator from 'chai-openapi-response-validator';
import path from 'path';

console.log(path.join(__dirname, '..', '..', '..', 'swagger.json'));
chai.use(chaiHttp);
chai.use(chaiResponseValidator(path.join(__dirname, '..', '..', '..', 'swagger.json')));

declare global {
  var expect: Chai.ExpectStatic;
  var request: Chai.ChaiHttpRequest;
}

global.expect = chai.expect;
global.request = chai.request;

// const { dirname } = require('path');
// const appDir = dirname(require.main.filename);
