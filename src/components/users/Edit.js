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

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `/api/users/${this.props.match.params.id}`,
      data: this.state
    })
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}`))
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <input className="input" name="username" placeholder="Username" onChange={this.handleChange} value={this.state.username || ''} />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input className="input" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email || ''} />
        </div>
        {/* <div className="field">
          <label className="label">Password</label>
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password || ''} />
        </div>
        <div className="field">
          <label className="label">Password Confirmation</label>
          <input className="input" type="password" name="passwordConfrimation" placeholder="Password Confirmation" onChange={this.handleChange} value={this.state.passwordConfrimation || ''} />
        </div> */}

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default UsersEdit;
