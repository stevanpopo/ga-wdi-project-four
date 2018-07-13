import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import _ from 'lodash';

class UsersShow extends React.Component{

  constructor(){
    super();
    this.state = {
      chartWeight: {},
      chartBlood: {},
      chartGlucose: {},
      formData: {}
    };
  }

  getChartData(){

    // axios call here
    axios.get('/api/records')
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
              data: weight
            }]
          },
          chartBlood: {
            labels: createdAt,
            datasets: [{
              label: 'Blood',
              data: blood
            }]
          },
          chartGlucose: {
            labels: createdAt,
            datasets: [{
              label: 'Glucose',
              data: glucose
            }]
          }
        });

      });
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({user: res.data});
        this.getChartData();
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
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return(
      <section>
        <h1>{this.state.user.username}</h1>
        <h1>{this.state.user.email}</h1>
        <Link to={`/users/${this.state.user._id}/edit`} className="button">Edit</Link>

        <section>
          <h3 className="title is-3">Add Medical Record</h3>
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
        </section>

        <section>
          <h3 className="title is-3">Medical History</h3>

          <div className="columns">
            <div className="column">
              <h4 className="title is-4">Weight</h4>
              <Line data={this.state.chartWeight} />
            </div>
            <div className="column">
              <h4 className="title is-4">Blood</h4>
              <Line data={this.state.chartBlood} />
            </div>
            <div className="column">
              <h4 className="title is-4">Glucose</h4>
              <Line data={this.state.chartGlucose} />
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default UsersShow;
