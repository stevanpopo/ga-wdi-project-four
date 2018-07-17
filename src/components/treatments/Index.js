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

  formatDates(treatmentsArray){

    function formatDate(date) {
      if(moment(date).isSame(moment(), 'day')) return 'Today';
      if(moment(date).isSame(moment().add(1, 'day'), 'day')) return 'Tomorrow';
      return moment(date).fromNow();
    }

    return treatmentsArray.reduce((formattedArray, treatment) => {
      const day = formattedArray.find(day => day.date === formatDate(treatment.dateTime));
      if (day) day.treatments.push(treatment);
      else formattedArray.push({ date: formatDate(treatment.dateTime), treatments: [treatment]});
      return formattedArray;
    }, []);
  }

  componentDidMount(){
    axios({
      url: '/api/treatments',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        const dateArray = this.formatDates(res.data);
        this.setState({ treatments: dateArray });
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
    this.setState({ treatments});
  }

  render(){
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.treatments) return <h2 className="title is-2">Loading...</h2>;
    return (
      <section className="section">
        <h4>Your treatment plan</h4>
        <div>
          {this.state.treatments.map(day =>

            <div key={day.date} className="treatment-index">

              <h5 className="date-placeholder">{day.date}</h5>

              {day.treatments.map(treatment =>
                <article key={treatment._id} className="treatment-article" >

                  <Link to={`/treatments/${treatment._id}`}>
                    <h2>{treatment.title}</h2>
                  </Link>
                  <p><strong>{moment(treatment.dateTime).calendar()}</strong></p>
                  {/* <p><strong>{typeof(treatment.dateTime)}</strong></p>
                  <p><strong>{moment('2018-07-17T17:00:00.000Z').calendar()}</strong></p>
                  <p><strong>{moment('2018-07-27T13:00:03.000Z').calendar()}</strong></p> */}
                  <p>{treatment.notes}</p>
                  {moment(treatment.dateTime).format('MM-DD-YYYY') === moment(Date.now()).format('MM-DD-YYYY') && <p onClick={() => this.toggleTreatment(treatment)}>Treatment completed? <span className="treatment-completed-button">{treatment.completed.toString()}</span></p>}

                </article>
              )}
              <hr />
            </div>


          )}

        </div>
      </section>
    );
  }
}

export default TreatmentsIndex;
