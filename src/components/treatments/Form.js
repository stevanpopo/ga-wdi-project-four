import React from 'react';

const TreatmentsForm = ({ handleSubmit, handleChange, data }) => {
  console.log('data', data);
  return(
    <section>
      <div className="columns is-centered">
        <div className="column is-half">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <input className="input" name="title" placeholder="Title" onChange={handleChange} value={data.title || '' } />
              {data.errors.title && <small>{data.errors.title}</small>}
            </div>
            <div className="field">
              <label className="label">Date & Time</label>
              <input className="input" name="dateTime" placeholder="Date & Time" onChange={handleChange} value={data.dateTime || '' } />
              {data.errors.dateTime && <small>{data.errors.dateTime}</small>}
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input className="input" name="image" placeholder="Image" onChange={handleChange} value={data.image || '' } />
              {data.errors.image && <small>{data.errors.image}</small>}
            </div>
            <div className="field">
              <label className="label">Notes</label>
              <input className="input" name="notes" placeholder="Notes" onChange={handleChange} value={data.notes || '' } />
              {data.errors.notes && <small>{data.errors.notes}</small>}
            </div>

            <button className="button">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsForm;
