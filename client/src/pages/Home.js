import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recipes from './recipes/Recipes';

import '../assets/home_page/css/style.css';
import '../assets/home_page/css/colors/green.css';

import Loader from '../components/Loader';
const Navbar = React.lazy(() => import("../components/Navbar"));

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAuthenticated: false,
        }
        console.log(props)
        console.log(props.children)
    }

    render() {

  
        return (
            <React.Fragment>

       </React.Fragment>
        )
};

}


export default Home;