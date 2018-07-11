import React from 'react';
import axios from 'axios';

import TreatmentsForm from './Form'

class TreatmentsNew extends React.Component{
  constructor(){
    super();
    this.state = {
      data: {}
    };
  }

  // componentDidMount(){
  //   axios.get('/api/treatments')
  //     .then(res => {
  //       console.log('res.data', res.data);
  //       this.setState({ data: res.data });
  //       console.log('this.state', this.state);
  //     })
  //     .catch(err => console.log('err', err));
  // }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/treatments',
      data: this.state
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
