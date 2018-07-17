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
      formData: {},
      populatedLovedOnes: []
    };
  }

  getChartData(){
    // axios call here
    console.log('in getChartData');
    axios({
      method: 'GET',
      url: '/api/records',
      headers: { Authorization: `Bearer ${Auth.getToken()}`, recordsOwnerIs: this.state.user._id}
    })
      .then(res => {
        //structure data
        console.log('res.data', res.data);
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
        });

      });
  }

  getLovedOnesData(email){
    axios({
      url: `/api/user/${email}`,
      method: 'GET'
    })
      .then(res => {
        const populatedLovedOnes = [...this.state.populatedLovedOnes, res.data];
        this.setState({ populatedLovedOnes });
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
        this.setState({user: res.data});
        this.getChartData();
        res.data.lovedOnes.forEach((person) => {
          this.getLovedOnesData(person);
        });
      })
      .catch(err => console.log('err', err));
  }

  componentWillReceiveProps = (nextProps) => {
    const currentId = this.state.user._id;
    const nextId = nextProps.match.params.id;
    console.log(currentId, nextId);
    if (currentId && currentId !== nextId) {

      axios({
        url: `/api/users/${nextProps.match.params.id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
        .then(res => {
          const populatedLovedOnes = [];
          this.setState({user: res.data, populatedLovedOnes});
          this.getChartData();
          res.data.lovedOnes.forEach((person) => {
            this.getLovedOnesData(person);
          });
        })
        .catch(err => console.log('err', err));

    }
  }

  handleChange = ({ target: { name, value }}) => {
    const formData = { ...this.state.formData, [name]: value };
    this.setState({ formData });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting the form', this.state);
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
    // console.log('this.state', this.state);
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return(
      <section>
        <h1>{this.state.user.username}</h1>
        <h1>{this.state.user.email}</h1>
        <p>{this.state.user.telephone}</p>
        <ul>
          {this.state.populatedLovedOnes.map((person) =>
            <li key={person._id}>
              <Link  to={`/users/${person._id}`}>{person.username} | {person._id}</Link>
            </li>
          )}
        </ul>
        <Link to={`/users/${this.state.user._id}/edit`} className="button">Edit</Link>

        {this.state.user.patient && this.state.user._id === Auth.getPayload().currentUser._id && <section>
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
