import React from 'react';

const TreatmentsForm = ({ handleSubmit, handleChange, data}) => {
  return(
    <section>
      <div>
        <h1>New Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <input className="input" name="title" placeholder="Title" onChange={handleChange} value={data.title || '' }/>
          </div>
          <div className="field">
            <label className="label">Date & Time</label>
            <input className="input" name="dateTime" placeholder="Date & Time" onChange={handleChange} />
          </div>
          <div className="field">
            <label className="label">Image</label>
            <input className="input" name="image" placeholder="Image" onChange={handleChange} />
          </div>
          <div className="field">
            <label className="label">Notes</label>
            <input className="input" name="notes" placeholder="Notes" onChange={handleChange} />
          </div>

          <button className="button">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default TreatmentsForm;
