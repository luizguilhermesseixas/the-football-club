import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers'
import { validToken, invalidToken } from './mocks/Users.mock';
import JwtUtils from '../utils/JwtUtils';
import { IPayload } from '../Interfaces/Users/IUser';
/* import Validations from '../../src/middlewares/Validations'; */

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('login/role test', async function () {
  /*   it('checks if when searching the route with a valid token, it returns the user role', async function () {
      const jwt = new JwtUtils();
      sinon.stub(jwt, 'decode').returns({ email: 'user@user.com' } as IPayload);
      const { status, body } = await chai.request(app).get('/login/role').set({ Authorization: `Bearer ${validToken}` });
  
      expect(status).to.equal(200);
      expect(body).to.haveOwnProperty('role');
    }); */
  it('checks if when searching the route with a invalid token, it returns an error message', async function () {
    const jwt = new JwtUtils();
    sinon.stub(jwt, 'decode').throws({ error: 'erro' });
    const { status, body } = await chai.request(app).get('/login/role').set({ Authorization: `Bearer ${invalidToken}` });

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: "Token must be a valid token" });
  });
  it('checks if when searching the route with no token, it returns an error message', async function () {
    const { status, body } = await chai.request(app).get('/login/role');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: "Token not found" });
  });
  /*   it('checks if searching the route with a valid token, but not finding the user, returns an error.', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(null)
      const { status, body } = await chai.request(app).get('/login/role').set({ Authorization: `Bearer ${validToken}` });
      expect(status).to.equal(404);
      expect(body).to.be.deep.equal({ message: 'user not found' });
    }); */
  afterEach(sinon.restore);
});