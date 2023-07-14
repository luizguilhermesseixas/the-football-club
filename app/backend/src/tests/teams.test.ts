import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams'
import { teams, teamByid } from './mocks/Teams.mock';
/* import Validations from '../../src/middlewares/Validations'; */

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('teams test', function () {
  it('should return all teams', async function () {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return a team by id', async function () {
    sinon.stub(SequelizeTeams, 'findOne').resolves(teamByid as any);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamByid);
  });

  it('should return null if a team doesnt exists', async function () {
    sinon.stub(SequelizeTeams, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/0');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({
      message: "Team 0 not found"
    });
  });
  afterEach(sinon.restore);
});