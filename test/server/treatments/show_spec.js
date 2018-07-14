/* global api, expect, describe, it, beforeEach */

const Treatment = require('../../../models/treatment');
const User = require('../../../models/user');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const treatmentData = {
  title: 'Treatment title',
  dateTime: new Date(),
  notes: 'Treatment notes',
  completed: false,
  image: 'Treatment image'
};

let treatment;

describe('GET /treatment/:id', () => {

  beforeEach(done => {
    Treatment.remove({})
      .then(() => User.remove({}))
      .then(() => User.create(userData))
      .then(user => {
        treatmentData.owner = user;
        return Treatment.create(treatmentData);
      })
      .then(res => treatment = res)
      .then(() => done());
  });


  it('should return a 200 status', done => {
    api.get(`/api/treatments/${treatment._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/treatments/${treatment._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return a treatment object', done => {
    api.get(`/api/treatments/${treatment._id}`)
      .end((err, res) => {
        expect(res.body).to.include.keys([
          '_id',
          'title',
          'dateTime',
          'image',
          'notes',
          'owner',
          'completed'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/treatments/${treatment._id}`)
      .end((err, res) => {
        expect(res.body.title).to.eq(treatmentData.title);
        expect(res.body.notes).to.eq(treatmentData.notes);
        expect(res.body.completed).to.eq(treatmentData.completed);
        expect(res.body.image).to.eq(treatmentData.image);
        expect(treatmentData.owner._id.equals(treatment.owner._id)).to.be.true;
        done();
      });
  });

});
