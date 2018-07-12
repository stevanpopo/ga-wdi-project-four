import React from 'react';

class AuthLogin extends React.Component{
  state = {};

  render(){
    return(
      <form>
        <div className="field">
          <label className="label">Email</label>
          <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input" name="password" placeholder="Password" onChange={this.handleChange} />
        </div>
      </form>
    );
  }
}

export default AuthLogin;
