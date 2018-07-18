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
      <div className="columns is-centered">
        <div className="column is-half">
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
            <div className="field">
              <label className="label">Patient</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="answer" onChange={this.handleChange} />
                  Yes
                </label>
                <label className="radio">
                  <input type="radio" name="answer" checked onChange={this.handleChange} />
                  No
                </label>
              </div>
            </div>
            <div className="field">
              <label className="label">Telephone (optional)</label>
              <input className="input" name="telephone" placeholder="Telephone" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Loved Ones (optional)</label>
              <input className="input" name="lovedOnes" placeholder="Loves ones..." onChange={this.handleChange} />
            </div>

            <button className="button">Submit</button>
          </form>
        </div>
      </div>

    );
  }
}

export default AuthRegister;
