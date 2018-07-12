import React from 'react';
import axios from 'axios';

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
        // need to set token here
        this.props.history.push('/login');
      })
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <section>
        <div>
          <form>
            <div className="field">
              <label className="label">Username</label>
              <input className="input" name="username" placeholder="Username" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input className="input" type="email" name="email" placeholder="Email" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input className="input" name="password" placeholder="Password" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <input className="input" name="passwordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange} />
            </div>

            <button className="button">Register</button>
          </form>
        </div>
      </section>
    );
  }
}

export default AuthRegister;
