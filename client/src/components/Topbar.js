import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { setCurrentUser } from "../actions/authActions";

import logoSm from '../assets/images/logos/Logo_v1.png';
import logo from '../assets/images/logos/Logo_v1.png';

import './dash.css';


class Topbar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  async componentDidMount() {
    await this.props.setCurrentUser();
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <React.Fragment>
        <div className="navbar-custom">
          <div className="container-fluid">
            <ul className="list-unstyled topnav-menu float-right mb-0">

              <li className="dropdown notification-list">
                <Link className={classNames('navbar-toggle', 'nav-link', { 'open': this.props.isMenuOpened })} to="#" onClick={this.props.menuToggle}>
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </li>

              <li className="d-none d-sm-block">
                <form className="app-search">
                  <div className="app-search-box">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search..." />
                      <div className="input-group-append">
                        <button className="btn" type="submit">
                          <i className="fe-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </li>

              <li>
              {isAuthenticated ? (
                  <div>
                    <br />
                    <h2 className="display-5 mb-4">Welcome, {user.name}</h2>
                  </div>
                ) : (
                  <div className="google-btn-container">
                    <a href="/auth/google">
                      <div className="google-btn">
                        <div className="google-icon-wrapper">
                          <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="signin"
                          />
                        </div>
                        <p className="btn-text">
                          <b>Log in with Google</b>
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </li>

              {/*Logout*/}
              {/* <li className="dropdown notification-list"> 
              <Link className="btn btn-link nav-link right-bar-toggle waves-effect waves-light" to="/logout"><i className="fe-log-out noti-icon"></i></Link>
              </li> */}
            </ul>

            {/*Logo*/}
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
          </div>
        </div>
      </React.Fragment >
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setCurrentUser })(Topbar);

