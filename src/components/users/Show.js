import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

class UsersShow extends React.Component{

  constructor(){
    super();
    this.state = {
      chartData: {
        // weight: [],
        // blood: [],
        // glucose: [],
        // createdAt: []
      }
    };
  }

  getChartData(){

    // axios call here
    axios.get('/api/records')
      .then(res => {
        // console.log(res);
        //structure data

        const weight = [];
        const blood = [];
        const glucose = [];
        const createdAt = [];

        // res.data is an array of objects
        // loop over array to get each object (record)
        res.data.forEach(record => {
          // console.log(record);
          // for each record take out the variables and put them in an array
          weight.push(record.weight);
          blood.push(record.blood);
          glucose.push(record.glucose);
          createdAt.push(record.createdAt);
        });

        console.log('weight', weight, 'blood', blood, 'glucose', glucose, 'created at', createdAt);
        this.setState({
          chartData: {
            labels: createdAt,
            datasets: [{
              label: 'Weight',
              data: weight
            }, {
              label: 'Blood',
              data: blood
            },{
              label: 'Glucose',
              data: glucose
            }]
          }
        });

      });

    // this.setState({
    //   chartData: {
    //     labels: ['April', 'May', 'June', 'July', 'August'],
    //     datasets: [{
    //       label: 'Weight',
    //       data: [89, 90, 93, 90, 91]
    //     }, {
    //       label: 'Blood',
    //       data: [60, 63, 63, 60, 62]
    //     },{
    //       label: 'Glucose',
    //       data: [75, 75, 76, 77, 78]
    //     }]
    //   }
    // });
  }

  componentWillMount(){
    console.log('get chart data');
    this.getChartData();
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({user: res.data});
        // setState for owner?
      })
      .catch(err => console.log('err', err));
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/records',
      data: this.state
    })
      .then(() => {
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
              <label className="label">Glucose</label>
              <input className="input" name="glucose" placeholder="Glucose" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Blood</label>
              <input className="input" name="blood" placeholder="Blood" onChange={this.handleChange} />
            </div>

            <button className="button">Submit Record</button>
          </form>
        </section>

        <section>
          <h3 className="title is-3">Medical History</h3>
          <Line data={this.state.chartData} />
        </section>
      </section>
    );
  }
}

export default UsersShow;
