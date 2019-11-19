import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/scss/DefaultTheme.scss';
import Topbar from './frontend/Topbar';
import Home from './frontend/Home';
import Landing from './frontend/Landing';
import Navbar2 from './frontend/Navbar';
import Alert from './frontend/Alert';
import store from './store';
import { PrivateRoute } from './routing/PrivateRoute';
import Recipes from './frontend/recipes/Recipes';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './frontend/profile/CreateProfile';
import { Provider } from 'react-redux';
import queryString from "query-string";
import axios from 'axios';
import './assets/scss/DefaultTheme.scss';
import AuthLayout from './components/AuthLayout';
import NonAuthLayout from './components/NonAuthLayout';
import Dashboard from './frontend/Dashboard';
import RecipeDetails from './frontend/recipes/RecipeDetails';
import Favourites from './frontend/Favourites';
import { getLoggedInUser } from './helpers/authUtils';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }
class App extends Component {

  // getLayout = () => {
  //   return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
  // }
  constructor() {
    super();
    this.state = {
      user: getLoggedInUser(),
      isAuthenticated: false,
      
    }
    this.authenticateUser.bind(this);
    this.handleLogout.bind(this);
    this.loadUser.bind(this);

    if (localStorage.getItem("accessJWT")) {
      this.loadUser();
    }
  }

  loadUser = () => {
    const token = localStorage.getItem("accessJWT");
    const user = axios.get(`/api/users/?token=${token}`, { withCredentials: true });
    this.setState({ user: user.data, isAuthenticated: true });
  }

  authenticateUser = (userData) => {
    this.setState({isAuthenticated: true, user: userData});
  };

  handleLogout = () => {
    this.setState({isAuthenticated: false, user: null});
  };

  // componentDidMount() {
  //   this.loadUser();
  // }

  // async componentDidMount() {
  //   // let query = queryString.parse(this.props.location.search);
  //   if (this.props.location.search) {
  //     let query = queryString.parse(this.props.location.search);
  //     if (query.token) {
      
  //       let userId = query.userId;
  //       let name = query.name;
  //       let token = query.token;
  //       window.localStorage.setItem("accessJWT", token);
  //       const user = await axios.get(`/api/users/${userId}`, {withCredentials: true});
  //       this.setState({ user: user, isAuthenticated: true, name: name });
  //     }

  //   }
  // }


  render() {
    return (
      // rendering the router with layout
      <div className="app">
        {/* {this.isAuthenticated ? AuthLayout : NonAuthLayout} */}
        {/* <AuthLayout /> */}
        <Navbar2 />
        <Router>
          <Switch>
            <Route exact path={"/"} render={props => (
              <Home {...props} isAuthenticated={this.state.isAuthenticated} />
            )} />
            <Route exact path={"/dashboard"}  render={props => (
              <Dashboard {...props} isAuthenticated={this.state.isAuthenticated} authenticateUser={this.authenticateUser} />
            )}/>
            <Route exact path={"/recipes"}  render={props => (
              <Recipes {...props} isAuthenticated={this.state.isAuthenticated} user={this.state.user} />
            )}/>
            <Route exact path={"/recipes/:id"}  render={props => (
              <RecipeDetails {...props} isAuthenticated={this.state.isAuthenticated} user={this.state.user} />
            )}/>
            <Route exact path={"/favourites"}  render={props => (
              <Favourites {...props} isAuthenticated={this.state.isAuthenticated} user={this.state.user} />
            )}/>
          </Switch>
          
        </Router>
      </div>

      // <Router>
      //   <Fragment>
      //     <div className="App">
      //     <Topbar authenticate={this.authenticateUser} isAuthenticated={this.state.isAuthenticated} />

      //     {/* <Recipes></Recipes>
      //     <Home></Home> */}
        
      //   {/* <section className="container">
      //     <Navbar />
      //   </section> */}
        
        
        
      //   <Switch>
      //     <Route exact path='/' component={Recipes} />
      //     <Route exact path="/home" render={(props) => <Home {...props} authenticate={this.authenticateUser.bind(this)}></Home>}/>
      //   </Switch>
        
      //   {/* </section> */}

      //     </div>
          

      //   </Fragment>
      // </Router>

    );
  }
}

// const App = () => {
//   useEffect(() => {
//     store.dispatch(loadUser());
//   }, []);
//   return (
//     <Provider store={store}>
//       <Router>
//         <Fragment>
//           <Topbar />
//           <Navbar />
//           <Route exact path='/' component={Landing} />
//           <section className="container">
//             {/* <Alert /> */}
//             <Switch>
//               <Route exact path="/createProfile" component={CreateProfile} />
//               <Route exact path="/home" component={Home} />
//               {/* <Route exact path="/register" component={Register} />
//               <Route exact path="/login" component={Login} /> */}
//               {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
//             </Switch>
//           </section>
//         </Fragment>
//       </Router>
//     </Provider>

//   );
// }

export default App;






// import React, { Component, Suspense } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Loadable from 'react-loadable';

// import { routes } from './routes';

// //get test api
// import { setupTest } from './helpers';
// import { isUserAuthenticated } from './helpers/authUtils';

// import './assets/scss/DefaultTheme.scss';

// const loading = () => <div></div>

// //all layouts
// const NonAuthLayout = Loadable({
//   loader: () => import('./components/NonAuthLayout'),
//   render(loaded, props) {
//     let Component = loaded.default;
//     return <Component {...props} />;
//   },
//   loading
// });

// const AuthLayout = Loadable({
//   loader: () => import('./components/AuthLayout'),
//   render(loaded, props) {
//     let Component = loaded.default;
//     return <Component {...props} />;
//   },
//   loading
// });

// setupTest();

// const withLayout = (WrappedComponent) => {
//   const HOC = class extends Component {
//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   };

//   return connect()(HOC);
// }


// class App extends Component {

//   getLayout = () => {
//     return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
//   }

//   state = {
//     recipes: []
//   }


//   render() {
//     return (
//       // rendering the router with layout
//       <BrowserRouter>
//         <React.Fragment>
//           {routes.map((route, index) => {
//             return (
//               <route.route
//                 key={index}
//                 path={route.path}
//                 exact={route.exact}
//                 roles={route.roles}
//                 component={withLayout(props => {
//                   const Layout = this.getLayout();
//                   return (
//                     <Suspense fallback={loading()}>
//                       <Layout {...props} title={route.title}>
//                         <route.component {...props} />
//                       </Layout>
//                     </Suspense>
//                   );
//                 })}
//               />
//             );
//           })}
//         </React.Fragment>
//       </BrowserRouter>
//     );
//   }
// }


// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.Auth.isAuthenticated
//   }
// }

// export default connect(mapStateToProps, null)(App);