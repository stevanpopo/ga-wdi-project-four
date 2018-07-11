import React from 'react';
import axios from 'axios';
import moment from 'moment';

class TreatmentsShow extends React.Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios.get(`/api/treatments/${this.props.match.params.id}`)
      .then(res => this.setState({ treatment: res.data }))
      .catch(err => console.log('err', err));
  }

  render(){
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.treatment) return <h1>Loading...</h1>;
    return(
      <section>
        <h2 className="title is-2">{this.state.treatment.title}</h2>
        <p>{moment(this.state.treatment.dateTime).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p>{this.state.treatment.notes}</p>
        <p>{this.state.treatment.completed}</p>
      </section>
    );
  }
}

export default TreatmentsShow;
