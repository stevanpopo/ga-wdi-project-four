import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import moment from 'moment';

import TreatmentsForm from './Form';

class TreatmentsNew extends React.Component{
  constructor(){
    super();
    this.state = {
      errors: {},
      typeOfCare: 'medicine', // form defaults to medicine
      owner: Auth.getPayload().currentUser, // set the owner to be logged in user
      startDate: moment(Date.now())
    };
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: '/api/treatments',
      data: this.state,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/treatments'))
      .catch(err => {
        console.log('err', err);
        this.setState({ errors: err.response.data.errors });
      });
  }

  toggleForm = (typeOfCare) => {
    this.setState({ typeOfCare: typeOfCare});
  }

  render(){
    return(
      <TreatmentsForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        data={this.state}
        toggleForm={this.toggleForm}
      />
    );
  }

}

export default TreatmentsNew;
