import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import logoSm from '../assets/images/logos/Logo_v1.png';
import logo from '../assets/images/logos/Logo_v1.png';
import axios from 'axios';

import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

import profilePic from '../assets/images/users/user-1.jpg';
import ProfileDropdown from './ProfileDropdown';

//redux action creator
import { googleLoginUser, logoutUser } from '../redux/auth/actions';


const ProfileMenus = [{
  label: 'My Profile',
  icon: 'fe-user',
  redirectTo: "/Profile",
},
{
  label: 'Favorites',
  icon: 'fe-heart',
  redirectTo: "/favorites"
}]

const loginbtnstyle = {
  'padding-top': '25px',
  'margin-top': '15px',
  'background-color': '#435966'
};

class Topbar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: null,
      isAuthenticated: false,
      userPic: profilePic,
      userName: 'Mystery Diner',
      gLogined: props.Auth.gLogined
    };
  }

  loginF(res, typ) {
    //alert(JSON.stringify(res));
    if (typ == "google" && res.El != "") { // googleId Check !
      //alert(JSON.stringify(res));            
      if (res.El != "undefined" && res.El != undefined) {

        //alert('Name: '+res.w3.ig+'     Email: '+res.w3.U3); // name + email
        //alert(res.El); // provider_id
        //alert(res.Zi.access_token); // token
        //alert(res.w3.Paa); // provider_picture

        var selpic, selname;
        selpic = ".rounded-circle";
        selname = ".pro-user-name";
        window.$gname = res.w3.ig;
        //  $(selpic).attr("src", res.w3.Paa);
        //  $(selname).text(window.$gname);

        // object with Logged In User details
        const userData = {
          userName: res.w3.ig,
          userEmail: res.w3.U3,
          userPic: res.w3.Paa,
          userToken: res.Zi.access_token,
          provider_id: res.El
        };

        const saveUserInfo = axios.get('http://localhost:5000/auth/google', userData)
          console.log(saveUserInfo.then(response => response.data));
          

        this.setState({
          gLogined: true
        }, function () {
          this.props.googleLoginUser(res.w3.ig, res.w3.Paa, true);
          this.props.history.push('/dashboard');
        });

        //alert('Name: '+res.w3.ig+'     Email: '+res.w3.U3); // name + email
        //return <Link to={this.getRedirectUrl(1), this.props.history} ></Link>
        //this.props.loginUser("test", "test", this.props.history);
      }
    }
  }

  logoutF(res, typ) {
    if (typ === "google" && res.El !== "") {

      if (res.El !== "undefined" && res.El !== undefined) {

        this.setState({
          gLogined: false

        }, function () {
            this.props.logoutUser(this.history);
            this.props.history.push('/home');
        });

      }
    }
  }

  render() {
    const responseGoogle = (response) => {
      console.log(response);
      this.loginF(response, "google");

      /*this.handleValidSubmit = this.handleValidSubmit.bind(this);
         this.state = {
             username: 'test',
             password: 'test'
      }*/
    }

    //alert(window.$gname);
    const logout = (response) => {
      console.log(response);
      this.logoutF(response, "google");
    }

    const loginButton = (
      <GoogleLogout
      style={loginbtnstyle}

        clientId="328199517198-5jn8oeo0q11i0iuf4cdjoeegm8kvrftp.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout} >
      </GoogleLogout>
    );

    const logoutButton = (
      <GoogleLogin
        style={loginbtnstyle}
        className="googlelogin"
        id="googlelogin"
        clientId="328199517198-5jn8oeo0q11i0iuf4cdjoeegm8kvrftp.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    );
    return (
      
      <React.Fragment>
        <div className="navbar-custom">
          <div className="container-fluid">
            <ul className="list-unstyled topnav-menu float-right mb-0">

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
                <ProfileDropdown profilePic={this.props.Auth.gUserPic ? this.props.Auth.gUserPic : this.state.userPic} menuItems={ProfileMenus} username={this.props.Auth.gUserName} />
              </li>
              <li className="margin-top-15">
                  { this.state.gLogined ? loginButton : logoutButton }
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

const mapStateToProps = (state) => {
  console.log(state)
  return state;
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ googleLoginUser, logoutUser }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);

