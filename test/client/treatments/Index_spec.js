/* global describe, beforeEach, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TreatmentsForm from '../../../src/components/treatments/Form';

describe('TreatmentsForm tests', () => {

  let wrapper;

  beforeEach(done => {
    const props = {
      data: {
        dateTime: new Date('July 14, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        // owner: users[0],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      }
    };

    wrapper = shallow(<TreatmentsForm {...props} />);
    done();
  });

})
