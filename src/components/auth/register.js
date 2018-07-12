import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class AuthRegister extends React.Component{

  state = {};

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/register',
      data: this.state
    })
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/login');
      })
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="label">Username</label>
          <input className="input" name="username" placeholder="Username" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="label">Password Confirmation</label>
          <input className="input" type="password" name="passwordConfirmation" placeholder="Password confirmation" onChange={this.handleChange} />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default AuthRegister;
