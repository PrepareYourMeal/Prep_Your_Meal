import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import logoSm from '../assets/images/logos/Logo_v1.png';
import logo from '../assets/images/logos/Logo_v1.png';


class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
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

              {/*Logout*/}
              <li className="dropdown notification-list"> 
              <Link className="btn btn-link nav-link right-bar-toggle waves-effect waves-light" to="/logout"><i className="fe-log-out noti-icon"></i></Link>
              </li>
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

export default connect()(Topbar);

