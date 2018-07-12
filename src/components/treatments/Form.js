import React from 'react';

const TreatmentsForm = ({ handleSubmit, handleChange, data }) => {
  console.log('data', data);
  return(
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <input className="input" name="title" placeholder="Title" onChange={handleChange} value={data.title || '' } />
            {data.errors.title && <small>{data.errors.title}</small>}
          </div>
          <div className="field">
            <label className="label">Date & Time</label>
            <input className="input" name="dateTime" placeholder="Date & Time" onChange={handleChange} value={data.dateTime || '' } />
          </div>
          <div className="field">
            <label className="label">Image</label>
            <input className="input" name="image" placeholder="Image" onChange={handleChange} value={data.image || '' } />
          </div>
          <div className="field">
            <label className="label">Notes</label>
            <input className="input" name="notes" placeholder="Notes" onChange={handleChange} value={data.notes || '' } />
          </div>

          <button className="button">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default TreatmentsForm;
