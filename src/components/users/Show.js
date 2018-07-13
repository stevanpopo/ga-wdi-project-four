import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UsersShow extends React.Component{

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({user: res.data}))
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
        console.log('submitted form');
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
        <Link to={`/users/${this.state.user._id}/edit`} className="button">Edit</Link>

        <section>
          <h3 className="title is-3">Add Medical Record</h3>
          <form onSubmit={this.handleSubmit}>
            <input className="input" type="hidden" name="owner" placeholder="Owner" value={this.state.user._id} />
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
      </section>
    );
  }
}

export default UsersShow;
