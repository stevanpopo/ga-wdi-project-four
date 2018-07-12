import React from 'react';

class UsersEdit extends React.Component{

  constructor(){
    super();
    this.state = {};
  }

  render(){
    console.log('this.state', this.state);
    return(
      <form>
        <div className="field">
          <label className="label">Username</label>
          <input className="input" name="username" placeholder="Username" />
        </div>
      </form>
    );
  }
}

export default UsersEdit;
