import React from 'react';
import Auth from '../lib/Auth';
import { Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props}) => {
  if (!Auth.isAuthenticated()) console.log('canny go here'); //error message should go here
  return Auth.isAuthenticated() ? <Route {...props} component={Component} /> : <Redirect to='/login' />;
};

export default ProtectedRoute;
