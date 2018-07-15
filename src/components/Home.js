import React from 'react';

const Home = () => {
  return(
    <section className="container">
      <div className="columns home-page">
        <div className="column">
          <img src="../assets/images/yourcare_demonstration_final.gif" alt="product demo" />
        </div>
        <div className="column content">
          <h1>Sign up now!</h1>
          <p><span className="logo">YourCare</span> is the home for your personal medical care. Through the <span className="logo">YourCare</span> web application you can:</p>
          <ul>
            <li>Track your personal medicine schedules and hospital appointments</li>
            <li>Record your medical data to monitor your ongoing health</li>
            <li>Allow your loved ones to monitor and be notified of your progress</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
