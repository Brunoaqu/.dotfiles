/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import chaiHttp from 'chai-http';
import chai from 'chai';
import chaiResponseValidator from 'chai-openapi-response-validator';
import path from 'path';
import 'reflect-metadata';

chai.use(chaiHttp);
chai.use(chaiResponseValidator(path.join(__dirname, '..', '..', '..', 'swagger.yaml')));

declare global {
  var expect: Chai.ExpectStatic;
  var request: Chai.ChaiHttpRequest;
}

global.expect = chai.expect;
global.request = chai.request;