import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import TreatmentsIndex from './components/treatments/Index';
import TreatmentsShow from './components/treatments/Show';
import TreatmentsNew from './components/treatments/New';
import TreatmentsEdit from './components/treatments/Edit';

import 'bulma';
import './scss/main.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <h1>YourCare</h1>
          <Route exact path="/" component={Home} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route path="/treatments/new" component={TreatmentsNew} />
                <Route path="/treatments/:id/edit" component={TreatmentsEdit} />
                <Route path="/treatments/:id" component={TreatmentsShow} />
                <Route path="/treatments" component={TreatmentsIndex} />
              </Switch>
            </div>
          </section>
        </main>
      </BrowserRouter>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
