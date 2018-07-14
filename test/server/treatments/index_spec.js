/* global api, expect, describe, it, beforeEach */

const Treatment = require('../../../models/treatment');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const treatmentData = [{
  title: 'Treatment title',
  dateTime: new Date(),
  notes: 'Treatment notes',
  completed: false,
  image: 'Treatment image'
}];

let token;

describe('GET /treatments', () => {
  beforeEach(done => {
    Treatment.remove({})
      .then(() => User.remove({}))
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        treatmentData[0].owner = user;
        return Treatment.create(treatmentData);
      })
      .then(() => done());
  });

  it('should return status 401 unauthorized', done => {
    api.get('/api/treatments')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return status 200 when authorized', done => {
    api.get('/api/treatments')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/treatments')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/treatments')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.body.forEach(treatment => expect(treatment).to.be.an('object'));
        done();
      });
  });

  it('should return an array of treatment objects', done => {
    api.get('/api/treatments')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.body.forEach(treatment => {
          expect(treatment).to.include.keys([
            '_id',
            'title',
            'dateTime',
            'image',
            'notes',
            'owner',
            'completed'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/treatments')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.body.forEach((treatment, index) => {
          expect(treatment.title).to.eq(treatmentData[index].title);
          // expect(treatment.dateTime).to.eq(treatmentData[index].dateTime);
          expect(treatment.image).to.eq(treatmentData[index].image);
          expect(treatment.notes).to.eq(treatmentData[index].notes);
          expect(treatment.completed).to.eq(treatmentData[index].completed);
          expect(treatmentData[index].owner._id.equals(treatment.owner._id)).to.be.true;
        });
        done();
      });
  });
});
