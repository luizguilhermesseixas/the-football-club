import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers'
import { loginWithoutPassword, loginWithoutEmail, loginValid, token, user } from './mocks/Users.mock';
/* import Validations from '../../src/middlewares/Validations'; */

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('login test', async function () {
  it('if the login is successful, it should return a token', async function () {
    sinon.stub(SequelizeUsers, 'findOne').resolves(user as SequelizeUsers);
    const { status, body } = await chai.request(app).post('/login').send(loginValid);

    expect(status).to.equal(200);
    expect(body).to.haveOwnProperty('token');
  });
  it('if the email is invalid, it should return an error', async function () {
    /*     sinon.stub(SequelizeUsers, 'findOne').resolves(null); */
    const { status, body } = await chai.request(app).post('/login').send(loginWithoutEmail);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: "All fields must be filled" });
  });
  it('if the password is invalid, it should return an error', async function () {
    /*     sinon.stub(SequelizeUsers, 'findOne').resolves(null); */
    const { status, body } = await chai.request(app).post('/login').send(loginWithoutPassword);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: "All fields must be filled" });
  });
  afterEach(sinon.restore);
});