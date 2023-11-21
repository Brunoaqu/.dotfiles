/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import chaiHttp from 'chai-http';
import chai from 'chai';
import chaiResponseValidator from 'chai-openapi-response-validator';
import path from 'path';

console.log(path.resolve(['../../swagger.json']));
chai.use(chaiHttp);
chai.use(chaiResponseValidator(path.resolve('../../swagger.json')));

declare global {
  var expect: Chai.ExpectStatic;
  var request: Chai.ChaiHttpRequest;
}

global.expect = chai.expect;
global.request = chai.request;
