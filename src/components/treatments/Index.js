import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class TreatmentsIndex extends React.Component{

  constructor(){
    super();
    this.state = {};
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
      if(i === index) {
        treatment.completed = !treatment.completed;
        axios({
          method: 'PUT',
          url: '/api/treatments',
          headers: { Authorization: `Bearer ${Auth.getToken()}`},
          data: treatment
        })
          .catch(err => console.log(err));
      }
      return treatment;
    });
    this.setState({ treatments}, console.log(this.state));
  }

  render(){
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.treatments) return <h2 className="title is-2">Loading...</h2>;
    return (
      <section className="section">
        <h4>Your treatment plan</h4>
        <div>
          {this.state.treatments.map(treatment =>



            <div key={treatment._id} className="treatment-index">
              {moment(treatment.dateTime).format('YYYY-MM-DD').toString() === moment(Date.now()).format('YYYY-MM-DD').toString() && <h5>Today</h5>}

              {moment(treatment.dateTime).format('YYYY-MM-DD').toString() === moment(Date.now()).add(1, 'days').format('YYYY-MM-DD').toString() && <h5>Tomorrow</h5>}

              {moment(treatment.dateTime).format('YYYY-MM-DD').toString() >=
              moment(Date.now()).add(2, 'days').format('YYYY-MM-DD').toString()
              && moment(treatment.dateTime).format('YYYY-MM-DD').toString()
              <= moment(Date.now()).add(2, 'days').format('YYYY-MM-DD').toString()
              && <h5>Later in the week</h5>}

              <h5 className="date-placeholder"></h5>

              <article className="treatment-article" >

                <Link to={`/treatments/${treatment._id}`}>
                  <h2>{treatment.title}</h2>
                </Link>
                <p><strong>{moment(treatment.dateTime).format('YYYY-MM-DD')} | {moment(treatment.dateTime).format('HH:mm:ss')}</strong></p>
                <p>{treatment.notes}</p>
                <p onClick={() => this.toggleTreatment(treatment)}>Treatment completed? <span className="treatment-completed-button">{treatment.completed.toString()}</span></p>

              </article>
            </div>


          )}

        </div>
      </section>
    );
  }
}

export default TreatmentsIndex;
