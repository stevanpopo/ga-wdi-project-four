import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class TreatmentsShow extends React.Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios.get(`/api/treatments/${this.props.match.params.id}`)
      .then(res => this.setState({ treatment: res.data }))
      .catch(err => console.log('err', err));
  }

  handleDelete = () => {
    axios({
      url: `/api/treatments/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/treatments'))
      .catch(() => {
        Flash.setMessage('danger', 'You must be logged in to delete treatments.');
        this.props.history.replace('/login');
      });
  }

  render(){
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.treatment) return <h2 className="title is-2">Loading...</h2>;
    return(
      <section>
        <h2 className="title is-2">{this.state.treatment.title}</h2>
        <p>{moment(this.state.treatment.dateTime).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p>{this.state.treatment.notes}</p>
        <p>{this.state.treatment.completed}</p>
        <Link to={`/treatments/${this.state.treatment._id}/edit`} className="button">Edit</Link>
        <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
      </section>
    );
  }
}

export default TreatmentsShow;
