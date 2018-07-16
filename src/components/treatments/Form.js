import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const TreatmentsForm = ({ handleSubmit, handleChange, data, toggleForm }) => {
  console.log('data', data);
  return(
    <section>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={handleSubmit}>
            <input className="input" type="hidden" name="owner" value={data.owner || ''} />
            <div className="field">
              <label className="label">Type of Care</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="answer" onClick={() => toggleForm('medicine')} />
                  Medicine
                </label>
                <label className="radio">
                  <input type="radio" name="answer" onClick={() => toggleForm('appointment')} />
                  Appointment
                </label>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <input className="input" name="title" placeholder="Title" onChange={handleChange} value={data.title || '' } />
              {data.errors.title && <small>{data.errors.title}</small>}
            </div>
            {/* <div className="field">
              <label className="label">Date & Time</label>
              <input className="input" name="dateTime" placeholder="Date & Time" onChange={handleChange} value={data.dateTime || '' } />
              {data.errors.dateTime && <small>{data.errors.dateTime}</small>}
            </div> */}
            <div className="field">
              <label className="label">Date & Time</label>
              <DatePicker
                className="input"
                name="dateTime"
                selected={data.startDate}
                onChange={handleChange}
                value={data.dateTime || '' }
                showTimeSelect
                dateFormat="LLL"
              />
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <input className="input" name="notes" placeholder="Notes" onChange={handleChange} value={data.notes || '' } />
              {data.errors.notes && <small>{data.errors.notes}</small>}
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input className="input" name="image" placeholder="Image" onChange={handleChange} value={data.image || '' } />
              {data.errors.image && <small>{data.errors.image}</small>}
            </div>
            {data.typeOfCare==='appointment' && <div className="field">
              <label className="label">Location</label>
              <input className="input" name="location" placeholder="Location" onChange={handleChange} value={data.location || '' } />
              {data.errors.location && <small>{data.errors.location}</small>}
            </div>}

            <button className="button">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsForm;
