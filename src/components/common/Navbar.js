import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Navbar extends React.Component{
  state = {
    navbarOpen: false
  }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false });
    }
  }

  render(){
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to='/' className="navbar-item">
            {/* <img src="#" alt="Logo" width="112" height="28" /> */}
            <h1>YourCare</h1>
          </Link>

          <a role="button"
            className={`navbar-burger${this.state.navbarOpen ? ' is-active': ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu${this.state.navbarOpen ? ' is-active': ''}`}>
          <div className="navbar-start">
            { Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().currentUser._id}`} className="navbar-item">Welcome back {Auth.getPayload().currentUser.username}</Link>}
          </div>
          <div className="navbar-end">
            <Link to='/' className="navbar-item">Home</Link>
            { Auth.isAuthenticated() && <Link to='/treatments' className="navbar-item">Treatment Plan</Link>}
            { Auth.isAuthenticated() && <Link to='/treatments/new' className="navbar-item">New Treatment</Link>}
            { !Auth.isAuthenticated() && <Link to='/register' className="navbar-item">Register</Link>}
            { !Auth.isAuthenticated() && <Link to='/login' className="navbar-item">Login</Link>}
            { Auth.isAuthenticated() && <Link to='/' className="navbar-item" onClick={Auth.logout}>Logout</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
