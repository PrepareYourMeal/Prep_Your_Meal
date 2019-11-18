import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import { logout } from '../actions/authActions';

// import { setCurrentUser } from "../actions/authActions";

import logoSm from '../assets/images/logos/Logo_v1.png';
import logo from '../assets/images/logos/Logo_v1.png';

// import './dash.css';

// import React from 'react'
// import PropTypes from 'prop-types'

// const Topbar = ({ auth: { isAuthenticated, loading }, logout }) => {

const authLinks = (
  <ul>
    <li>
      <Link to='/dashboard'>
        <span className="hide-sm">Dashboard</span>
      </Link>
    </li>
    <li>
      <a onClick={logout} href="#!">
          <span className="hide-sm">Logout</span>
        </a>
    </li>
  </ul>
);

const guestLinks = (
  <ul>
    <li>
      <div className="google-btn-container">
        <a href="/auth/google">
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="signin" />
            </div>
            <p className="btn-text">
              <b>Log in with Google(Review app)</b>
            </p>
          </div>
        </a>
      </div>
    </li>
  </ul>
)
//   return (
//     <Fragment>
//     <div className="navbar-custom">
//       <div className="container-fluid">
//       <div className="logo-box">
//             <Link to="/" className="logo text-center">
//                  <span className="logo-lg">
//                  <img src={logo} alt="" height="35" />
//                  </span>
//                  <span className="logo-sm">
//                    <img src={logoSm} alt="" height="24" />
//                  </span>
//                </Link>
//              </div>
//         <ul className="list-unstyled topnav-menu float-right mb-0">
//   { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
//         </ul>
//       </div>
      
//     </div>
//     </Fragment>

//   )
// }

// Topbar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired

// }

// const mapStateToProps = state => ({
//   auth: state.auth
// })

// export default connect(mapStateToProps, { logout })(Topbar);


class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null
    };
  }

  // async componentDidMount() {
  //   await this.props.setCurrentUser();
  // }


  render() {
    // const { isAuthenticated, user } = this.props.auth;
    // const {  }

    return (
 <Fragment>
     <div className="navbar-custom">
       <div className="container-fluid">
       <div className="logo-box">
             <Link to="/" className="logo text-center">
                  <span className="logo-lg">
                  <img src={logo} alt="" height="35" />
                  </span>
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="24" />
                  </span>
                </Link>
              </div>
         <ul className="list-unstyled topnav-menu float-right mb-0">
   { <Fragment>{ this.state.isAuthenticated ? authLinks : guestLinks }</Fragment> }
         </ul>
       </div>
      
     </div>
     </Fragment>
    );
    }
  }


// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(Topbar);
export default Topbar;