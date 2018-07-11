import React from 'react';
import axios from 'axios';

class TreatmentsNew extends React.Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios.get('/treatments')
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <section>
        <div>
          <h1>New Page</h1>
          <form>
            <div className="field">
              <label className="label">Title</label>
              <input className="input" />
            </div>
          </form>
        </div>
      </section>
    );
  }

}

export default TreatmentsNew;
