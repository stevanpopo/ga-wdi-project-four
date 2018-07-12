import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import TreatmentsIndex from './components/treatments/Index';
import TreatmentsShow from './components/treatments/Show';
import TreatmentsNew from './components/treatments/New';
import TreatmentsEdit from './components/treatments/Edit';
import AuthRegister from './components/auth/Register';
import AuthLogin from './components/auth/Login';

import 'bulma';
import './scss/main.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className="section">
            <div className="container">
              <Switch>
                <ProtectedRoute path="/treatments/new" component={TreatmentsNew} />
                <ProtectedRoute path="/treatments/:id/edit" component={TreatmentsEdit} />
                <Route path="/treatments/:id" component={TreatmentsShow} />
                <Route path="/treatments" component={TreatmentsIndex} />
                <Route path="/register" component={AuthRegister} />
                <Route path="/login" component={AuthLogin} />
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
