import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class TreatmentsIndex extends React.Component{

  constructor(){
    super();
    this.state = {
      // treatments: []
    };
  }

  componentDidMount(){
    axios({
      url: '/api/treatments',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({ treatments: res.data });
      })
      .catch(err => console.log('err', err));
  }

  toggleTreatment(treatment){
    const index = this.state.treatments.indexOf(treatment);
    const treatments = this.state.treatments.map((treatment, i) => {
      if(i === index) treatment.completed = !treatment.completed;
      return treatment;
    });
    this.setState({ treatments});
  }

  render(){
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.treatments) return <h2 className="title is-2">Loading...</h2>;
    return (
      <section className="section">
        <h1 className="title is-1">TreatmentsIndex</h1>
        <div className="columns is-multiline">
          {this.state.treatments.map(treatment =>


            <div key={treatment._id} className="column is-three-quarters">
              <div>
                <Link to={`/treatments/${treatment._id}`}>
                  <h2 className="title is-2">{treatment.title}</h2>
                </Link>
                <p>{moment(treatment.dateTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>{treatment.notes}</p>
                <p>{treatment.owner.username}</p>
                <button className="button" onClick={() => this.toggleTreatment(treatment)}>Treatment complete? {treatment.completed.toString()}</button>
              </div>
            </div>

          )}

        </div>
      </section>
    );
  }
}

export default TreatmentsIndex;
