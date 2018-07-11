import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import TreatmentsIndex from './components/treatments/Index';

import 'bulma';
import './scss/main.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <h1>YourCare</h1>
          <Route exact path="/" component={Home} />
          <Switch>
            <section className="section">
              <div className="container">
                <Route path="/treatments" component={TreatmentsIndex} />
              </div>
            </section>
          </Switch>
        </main>
      </BrowserRouter>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
