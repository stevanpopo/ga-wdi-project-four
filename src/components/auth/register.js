import React from 'react';

class AuthRegister extends React.Component{

  this.state = {};

  render(){
    return(
      <section>
        <div>
          <form>
            <div className="field">
              <label className="label">Username</label>
              <input className="input" name="username" placeholder="Username" onChange={handleChange} value={data.username || '' } />
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input className="input" type="email" name="email" placeholder="Email" onChange={handleChange} value={data.email || '' } />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input className="input" name="password" placeholder="Password" onChange={handleChange} value={data.password || '' } />
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <input className="input" name="passwordConfirmation" placeholder="Password Confirmation" onChange={handleChange} value={data.passwordConfirmation || '' } />
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default AuthRegister;
