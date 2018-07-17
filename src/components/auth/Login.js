import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class AuthLogin extends React.Component{
  state = {
    errors: {}
  };

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/login',
      data: this.state
    })
      .then(res => {
        Auth.setToken(res.data.token);
        if(res.data.user.patient) this.props.history.push('/treatments');
        else this.props.history.push(`/users/${res.data.user._id}`);
      })
      .catch(()=> {
        Flash.setMessage('danger', 'Incorrect credentials.');
        // this.setState({ errors: err.response.data.errors }); //err
        this.props.history.replace('/login');
      });
  }

  render(){
    return(
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
              {/* {this.state.errors.email && <small>{this.state.errors.email}</small>} */}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
            </div>

            <button className="button">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthLogin;
