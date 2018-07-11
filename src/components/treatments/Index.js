import React from 'react';
import axios from 'axios';

class TreatmentsIndex extends React.Component{

  constructor(){
    super();
    this.state = {
      treatments: []
    };
  }

  componentDidMount(){
    axios.get('/api/treatments')
      .then(res => this.setState({ treatments: res.data }));
  }

  render(){
    return (
      <section>
        <h1>TreatmentsIndex</h1>
      </section>
    );
  }
}

export default TreatmentsIndex;
