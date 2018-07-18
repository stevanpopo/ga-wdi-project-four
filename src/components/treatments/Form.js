import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const TreatmentsForm = ({ handleSubmit, handleChange, data, toggleForm, handleDate }) => {
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
            <div className="field">
              <label className="label">Date & Time</label>
              <DatePicker
                autoComplete="off"
                className="input"
                name="dateTime"
                selected={data.dateTime}
                onChange={handleDate}
                showTimeSelect
                timeIntervals={15}
                dateFormat="LLL"
                timeFormat="HH:mm"
                timeCaption="time"
              />
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <input className="input" name="notes" placeholder="Notes" onChange={handleChange} value={data.notes || '' } />
              {data.errors.notes && <small>{data.errors.notes}</small>}
            </div>
            {data.typeOfCare==='medicine' && <div className="field">
              <label className="label">Image</label>
              <input className="input" name="image" placeholder="Image" onChange={handleChange} value={data.image || '' } />
              {data.errors.image && <small>{data.errors.image}</small>}
            </div>}
            {data.typeOfCare==='appointment' && <div className="field">
              <label className="label">Location</label>
              <input className="input" name="location" placeholder="Location" onChange={handleChange} value={data.location || '' } />
              {data.errors.location && <small>{data.errors.location}</small>}
            </div>}
            {/* <div className="field">
              <label className="label">Notifications</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="notifications" value="on"  onChange={handleChange} />
                  On
                </label>
                <label className="radio">
                  <input type="radio" name="notifications"  value="off"  onChange={handleChange}/>
                  Off
                </label>
              </div>
            </div> */}

            <button className="button">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsForm;
