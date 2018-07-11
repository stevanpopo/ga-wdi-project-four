import React from 'react';
import axios from 'axios';

import TreatmentsForm from './Form';

class TreatmentsEdit extends React.Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios.get(`/api/treatments/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <TreatmentsForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        data={this.data}
      />
    );
  }
}

export default TreatmentsEdit;
