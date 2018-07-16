import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import _ from 'lodash';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component{

  constructor(){
    super();
    this.state = {
      chartWeight: {},
      chartBlood: {},
      chartGlucose: {},
      // options: {
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }]
      //   }
      // },
      formData: {}
    };
  }

  getChartData(){
    // axios call here
    axios({
      method: 'GET',
      url: '/api/records',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        //structure data
        const weight = [];
        const blood = [];
        const glucose = [];
        const createdAt = [];

        // need to sort res.data by date
        const sortedRecords = _.sortBy(res.data, ['createdAt']);

        // res.data is an array of objects
        // loop over array to get each object (record)
        sortedRecords.forEach(record => {
          // for each record take out the variables and put them in an array
          weight.push(record.weight);
          blood.push(record.blood);
          glucose.push(record.glucose);
          createdAt.push(moment(record.createdAt).format('YYYY-MM-DD'));
        });

        this.setState({
          chartWeight: {
            labels: createdAt,
            datasets: [{
              label: 'Weight',
              data: weight,
              backgroundColor: 'rgba(54, 162, 235, 0.2)'
            }]
          },
          chartBlood: {
            labels: createdAt,
            datasets: [{
              label: 'Blood',
              data: blood,
              backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }]
          },
          chartGlucose: {
            labels: createdAt,
            datasets: [{
              label: 'Glucose',
              data: glucose,
              backgroundColor: 'rgba(255, 206, 86, 0.2)'
            }]
          }
        }, () => console.log('get chart data'));

      });
  }

  getLovedOnesData(email, index, lovedOnes){
    axios({
      url: `/api/user/${email}`,
      method: 'GET'
    })
      .then(res => {
        console.log('lovedOnes', lovedOnes);
        lovedOnes[index] = res.data;
        if(index === lovedOnes.length-1) this.setState({ ...this.state, user: { ...this.state.user, lovedOnes: lovedOnes }});
      })
      .catch(err => console.log('err', err));
  }

  componentDidMount(){
    axios({
      url: `/api/users/${this.props.match.params.id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        // console.log('res',res);
        this.setState({user: res.data}, () => console.log('componentDidMount'));
        this.getChartData();
        // console.log('lovedOnes', res.data.lovedOnes);
        res.data.lovedOnes.forEach((person, index) => {
          this.getLovedOnesData(person, index, res.data.lovedOnes);
        });
      })
      .catch(err => console.log('err', err));
  }

  handleChange = ({ target: { name, value }}) => {
    const formData = { ...this.state.formData, [name]: value };
    this.setState({ formData });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/records',
      data: this.state.formData
    })
      .then(() => {
        this.getChartData();
        this.props.history.push(`/users/${this.props.match.params.id}`);
      })
      .catch(err => console.log('err', err));
  }

  render(){
    console.log('this.state', this.state);
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return(
      <section>
        <h1>{this.state.user.username}</h1>
        <h1>{this.state.user.email}</h1>
        <p>{this.state.user.telephone}</p>
        <ul>
          {this.state.user.lovedOnes.map(person =>
            <li key={person._username}><Link to={`/users/${person._id}`}>{person.username}</Link></li>
          )}
        </ul>
        <Link to={`/users/${this.state.user._id}/edit`} className="button">Edit</Link>

        {this.state.user.patient && <section>
          <h3>Add Medical Record</h3>
          <div className="columns">
            <div className="column is-half">
              <form onSubmit={this.handleSubmit}>
                <input className="input" type="hidden" name="user" value={this.state.user} />
                <div className="field">
                  <label className="label">Weight</label>
                  <input className="input" name="weight" placeholder="Weight" onChange={this.handleChange} />
                </div>
                <div className="field">
                  <label className="label">Blood</label>
                  <input className="input" name="blood" placeholder="Blood" onChange={this.handleChange} />
                </div>
                <div className="field">
                  <label className="label">Glucose</label>
                  <input className="input" name="glucose" placeholder="Glucose" onChange={this.handleChange} />
                </div>

                <button className="button">Submit Record</button>
              </form>
            </div>
          </div>
        </section>}

        {this.state.user.patient && <section>
          <h3>Medical History</h3>

          <div className="columns">
            <div className="column">
              <h4>Weight</h4>
              <Line data={this.state.chartWeight} options={this.state.options}  />
            </div>
            <div className="column">
              <h4>Blood</h4>
              <Line data={this.state.chartBlood} options={this.state.options} />
            </div>
            <div className="column">
              <h4>Glucose</h4>
              <Line data={this.state.chartGlucose} options={this.state.options} />
            </div>
          </div>
        </section>}
      </section>
    );
  }
}

export default UsersShow;
