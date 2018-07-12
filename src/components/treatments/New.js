import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import TreatmentsForm from './Form';

class TreatmentsNew extends React.Component{
  constructor(){
    super();
    this.state = {
      data: {}
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
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <TreatmentsForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        data={this.state}
      />
    );
  }

}

export default TreatmentsNew;
