import React from 'react';
import axios from 'axios';

class TreatmentsNew extends React.Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios.get('/treatments')
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log('err', err));
  }

  render(){
    return(
      <section>
        <div>
          <h1>New Page</h1>
          <form>
            <div className="field">
              <label className="label">Title</label>
              <input className="input" name="title" placeholder="Title" onChange={handleChange} value={data.title || ''} />
            </div>
            <div className="field">
              <label className="label">Date & Time</label>
              <input className="input" name="dateTime" placeholder="Date & Time" onChange={handleChange} value={data.dateTime || ''} />
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input className="input" name="image" placeholder="Image" onChange={handleChange} value={data.image || ''} />
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <input className="input" name="notes" placeholder="Notes" onChange={handleChange} value={data.notes || ''} />
            </div>
          </form>
        </div>
      </section>
    );
  }

}

export default TreatmentsNew;
