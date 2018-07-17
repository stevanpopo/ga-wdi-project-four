/* global describe, beforeEach, it, before, after */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import axios from 'axios';
import Promise from 'bluebird';
import _ from 'lodash';

import TreatmentsIndex from '../../../src/components/treatments/Index';

const user = {
  username: 's',
  email: 's@s.s',
  password: 's'
};

const data = [{
  _id: 1,
  dateTime: new Date('July 14, 2018 06:00:00'),
  title: 'Morning pills x 3',
  completed: false,
  owner: user,
  image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
  notes: 'To be taken before eating breakfast.'
},{
  _id: 2,
  dateTime: new Date('July 15, 2018 06:00:00'),
  title: 'Morning pills x 4',
  completed: false,
  owner: user,
  image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
  notes: 'To be taken before eating breakfast.'
}];

describe('TreatmentsIndex tests', () => {
  let wrapper;
  let promise;

  before(done => {
    promise = Promise.resolve({ data });
    sinon.stub(axios, 'get').returns(promise);
    done();
  });

  after(done => {
    axios.get.restore();
    done();
  });

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter>
        <TreatmentsIndex />
      </MemoryRouter>
    );
    done();
  });

  it('should render treatments', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('.treatment-article').length).to.eq(2);
      done();
    })
      .catch(err => console.log(err));
  });

  it('should render the correct data', done => {
    promise.then(() => {
      wrapper.update();
      _.orderBy(data, ['dateTime']).forEach((treatment, index) => {
        expect(wrapper.find('h2').at(index).text()).to.eq(treatment.title);
        expect(wrapper.find('Link').at(index).prop('to')).to.eq(`/treatments/${treatment._id}`);
      });
      done();
    });
  });

});
