/* global describe, beforeEach, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// import User from '../../../models/user';
import TreatmentsForm from '../../../src/components/treatments/Form';

describe('TreatmentsForm tests', () => {

  let wrapper;

  beforeEach(done => {
    const props = {
      data: {
        dateTime: new Date('July 14, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.',
        errors: {}
      }
    };

    wrapper = shallow(<TreatmentsForm {...props} />);
    done();
  });

  it('should render a form', done => {
    expect(wrapper.find('form').length).to.eq(1);
    done();
  });

  it('should render the correct inputs', done => {
    expect(wrapper.find('[name="dateTime"]').length).to.eq(1);
    expect(wrapper.find('[name="title"]').length).to.eq(1);
    // expect(wrapper.find('[name="completed"]').length).to.eq(1);
    expect(wrapper.find('[name="image"]').length).to.eq(1);
    expect(wrapper.find('[name="notes"]').length).to.eq(1);
    expect(wrapper.find('button').length).to.eq(1);
    done();
  });

});
