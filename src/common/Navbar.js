import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
  state = {}

  render(){
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to='/' className="navbar-item">
            <img src="#" alt="Logo" width="112" height="28" />
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Link to='/' className="navbar-item">Home</Link>
            <Link to='/treatments' className="navbar-item">Index</Link>
            <Link to='/treatments/new' className="navbar-item">New Treatment</Link>
            <Link to='/register' className="navbar-item">Register</Link>
            <Link to='/login' className="navbar-item">Login</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
