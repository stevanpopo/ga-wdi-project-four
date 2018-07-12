import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import TreatmentsForm from './Form';

class TreatmentsEdit extends React.Component{
  constructor(){
    super();
    this.state = {
      data: {},
      errors: {}
    };
  }

  componentDidMount(){
    axios.get(`/api/treatments/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ data: res.data }, () => console.log(this.state));
      })
      .catch(err => console.log('err', err));
  }

  handleChange = ({ target: { name, value }}) => {
    console.log('name & value', name, value);
    const data = { ...this.state.data, [name]: value };
    this.setState({ data });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `/api/treatments/${this.props.match.params.id}`,
      data: this.state.data,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/treatments'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <TreatmentsForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        data={this.state.data}
      />
    );
  }
}

export default TreatmentsEdit;
