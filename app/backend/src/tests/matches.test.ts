import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches'
import * as jwt from 'jsonwebtoken';
import { matches, matchesInProgress } from './mocks/Matches.mock';
import { invalidToken, validToken } from './mocks/Users.mock';
/* import Validations from '../../src/middlewares/Validations'; */

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('matches test', function () {
  it('should return all matches', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should return matches by progress', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgress as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('should change a match result', async function () {
    sinon.stub(jwt, 'verify').returns({ email: 'user@user.com' } as any);
    sinon.stub(SequelizeMatches, 'update').resolves([0]);
    const { status, body } = await chai.request(app).patch('/matches/1').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }).set('Authorization', `Bearer ${validToken}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({
      message: "Finished"
    })
  });

  it('should return an error if try to change a match result with an invalid token', async function () {
    sinon.stub(jwt, 'verify').throws({ error: 'erro' });
    /* sinon.stub(SequelizeMatches, 'update').resolves([0]); */
    const { status, body } = await chai.request(app).patch('/matches/1').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }).set('Authorization', `Bearer ${invalidToken}`);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({
      message: "Token must be a valid token"
    });
  });

  it('should return an error if search the route without token', async function () {
    const { status, body } = await chai.request(app).patch('/matches/1').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: "Token not found" });
  });

  afterEach(sinon.restore);
});