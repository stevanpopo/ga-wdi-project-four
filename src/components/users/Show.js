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

  render(){
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return(
      <section>
        <h1>{this.state.user.username}</h1>
        <h1>{this.state.user.email}</h1>
        <Link to={`/users/${this.state.user._id}/edit`} className="button">Edit</Link>
        
        <section>
          <h3 className="title is-3">Add Medical Record</h3>
          <form>
            <input className="input" type="hidden" name="owner" placeholder="Owner" value={this.state.user._id} />
            <div className="field">
              <label className="label">Weight</label>
              <input className="input" name="weight" placeholder="Weight" />
            </div>
            <div className="field">
              <label className="label">Glucose</label>
              <input className="input" name="glucose" placeholder="Glucose" />
            </div>
            <div className="field">
              <label className="label">Blood</label>
              <input className="input" name="blood" placeholder="Blood" />
            </div>
          </form>
        </section>
      </section>
    );
  }
}

export default UsersShow;
