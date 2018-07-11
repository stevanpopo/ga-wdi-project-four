import React from 'react';
import axios from 'axios';

import TreatmentsForm from './Form';

class TreatmentsEdit extends React.Component{
  constructor(){
    super();
    this.state = {
      data: {}
    };
  }

  componentDidMount(){
    axios.get(`/api/treatments/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => console.log('err', err));
  }

  handleChange = ({ target: { name, value }}) => {
    console.log('name & value', name, value);
    this.setState({data: { [name]: value }});
    // this.setState({[name]: value });
    console.log('this.state', this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `/api/treatments/${this.props.match.params.id}`,
      data: this.state.data
    })
      .then(() => this.props.history.push('/treatments'))
      .catch(err => console.log('err', err));
  }

  render(){
    if(!this.state.data.title) return <h2 className="title is-2">Loading..</h2>;
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
