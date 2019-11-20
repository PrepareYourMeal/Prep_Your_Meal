import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { routes } from './routes';

//get test api
import { setupTest } from './helpers';
import { isUserAuthenticated } from './helpers/authUtils';

import './assets/scss/DefaultTheme.scss';

const loading = () => <div></div>

//non authorizatin layout
const NonAuthLayout = Loadable({
  loader: () => import('./components/NonAuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

//authorization layout
const AuthLayout = Loadable({
  loader: () => import('./components/AuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

//test api
setupTest();

const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect()(HOC);
}


class App extends Component {

  getLayout = () => {
    return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
  }
  render() {
    return (
      // rendering the router with layout
      <BrowserRouter>
        <React.Fragment>
          {routes.map((route, index) => {
            return (
              <route.route
                key={index}
                path={route.path}
                exact={route.exact}
                roles={route.roles}
                component={withLayout(props => {
                  const Layout = this.getLayout();
                  return (
                    <Suspense fallback={loading()}>
                      <Layout {...props} title={route.title}>
                        <route.component {...props} />
                      </Layout>
                    </Suspense>
                  );
                })}
              />
            );
          })}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(App);