import React from 'react';
import axios from 'axios';

class TreatmentsNew extends React.Component{
  constructor(){
    super();
    this.state = {
      data: {}
    };
  }

  // componentDidMount(){
  //   axios.get('/api/treatments')
  //     .then(res => {
  //       console.log('res.data', res.data);
  //       this.setState({ data: res.data });
  //       console.log('this.state', this.state);
  //     })
  //     .catch(err => console.log('err', err));
  // }

  handleChange = ({ target: { name, value }}) => {
    console.log(name, value);
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/treatments',
      data: this.state
    })
      .then(() => this.props.history.push('/treatments'))
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <section>
        <div>
          <h1>New Page</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <input className="input" name="title" placeholder="Title" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Date & Time</label>
              <input className="input" name="dateTime" placeholder="Date & Time" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input className="input" name="image" placeholder="Image" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <input className="input" name="notes" placeholder="Notes" onChange={this.handleChange} />
            </div>

            <button className="button">Submit</button>
          </form>
        </div>
      </section>
    );
  }

}

export default TreatmentsNew;
