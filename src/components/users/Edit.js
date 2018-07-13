import React from 'react';
import axios from 'axios';

class UsersEdit extends React.Component{

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .catch(err => console.log('err', err));
  }

  render(){
    console.log('this.state', this.state);
    return(
      <form>
        <div className="field">
          <label className="label">Username</label>
          <input className="input" name="username" placeholder="Username" value={this.state.username || ''} />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input className="input" name="email" placeholder="Email" value={this.state.email || ''} />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input" type="password" name="password" placeholder="Password" value={this.state.password || ''} />
        </div>
        <div className="field">
          <label className="label">Password Confirmation</label>
          <input className="input" type="password" name="passwordConfrimation" placeholder="Password Confirmation" value={this.state.passwordConfrimation || ''} />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default UsersEdit;
