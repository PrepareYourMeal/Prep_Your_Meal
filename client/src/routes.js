import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';

import { isUserAuthenticated } from './helpers/authUtils';

// load views
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Recipes = React.lazy(() => import('./pages/recipes/Recipes'));
const Details = React.lazy(() => import('./pages/recipes/RecipeDetails'));
const Favorites = React.lazy(() => import('./pages/favorites/Favorites'));
const Seasonal = React.lazy(() => import('./pages/seasonal/Seasonal'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const Planner = React.lazy(() => import('./pages/profile/Planner'));
const Home = React.lazy(() => import('./pages/Home'));


const Help = React.lazy(() => import('./pages/information/Help'));
const Contact = React.lazy(() => import('./pages/information/Contact'));
const About = React.lazy(() => import('./pages/information/About'));

// auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Logout = React.lazy(() => import('./pages/auth/Logout'));
const ForgetPassword = React.lazy(() => import('./pages/account/ForgetPassword'));
const Register = React.lazy(() => import('./pages/account/Register'));
const ConfirmAccount = React.lazy(() => import('./pages/account/Confirm'));


export const PrivateRoute = ({ component: Component, handleLogout, isAuthenticated, ...rest }) => (
  <Route
      {...rest}
      render={props => 
      localStorage.getItem("accessJWT") && isAuthenticated === true ? (
          <Component {...props} handleLogout={handleLogout}/>
      ) : (
          <Redirect
          to={{
              pathname: "/",
              state: { from: props.location }
          }}

          />
      )}
  />
);



const routes = [
  // auth and account
  { path: '/login', name: 'Login', component: Login, route: Route },
  { path: '/logout', name: 'Logout', component: Logout, route: Route },
  { path: '/forget-password', name: 'Forget Password', component: ForgetPassword, route: Route },
  { path: '/register', name: 'Register', component: Register, route: Route },
  { path: '/confirm', name: 'Confirm', component: ConfirmAccount, route: Route },
  { path: '/home', name: 'Home', component: Home, route: Route },

  // other pages
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, route: Route, title: 'Dashboard' },
  { path: '/recipes', name: 'Recipes', component: Recipes, route: Route, exact:true, title: 'Recipes' },
  { path: '/recipe/:id', name: 'RecipeDetails', component: Details, route: Route, title: 'RecipeDetails' },

  // company information
  { path: '/contact', name: 'Contact Us', component: Contact, route: Route, title: 'Contact Us' },
  { path: '/help', name: 'Help', component: Help, route: Route, title: 'Help' },
  { path: '/about', name: 'About Us', component: About, route: Route, title: 'About Us' },

  { path: '/favorites', name: 'Favorites', component: Favorites, route: Route, title: 'Favorites' },
  { path: '/seasonal', name: 'Seasonal', component: Seasonal, route: Route, title: 'Seasonal' },
  { path: '/profile', name: 'Profile', component: Profile, route: Route, title: 'Profile' },
  { path: '/planner', name: 'Planner', component: Planner, route: Route, title: 'Planner' },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
    route: Route
  },
  
]

export { routes };
