import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';

import Loader from '../../components/Loader';


class Recipes extends Component {


    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    async componentWillMount() {
        console.log("1")
        let query = queryString.parse(this.props.location.search);
        if (query.token) {
            console.log("2")
        
            let userId = query.userId;
            let token = query.token;
            window.localStorage.setItem("accessJWT", token);
            console.log("3")
            
            const user = await axios.get(`http://localhost:5000/api/users/?token=${token}`, { withCredentials: true });
            console.log("4")
            console.log(user);
            this.setState({ user: user.data, isAuthenticated: true });
            // this.setState({ user: user, isAuthenticated: true, name: name });
            this.props.authenticate(user.data);
            console.log("5")
            
            this.props.history.push('/home');
      
        }
    }

    render() {

        return (
            <div class="container">
            <div class="col-12">
                <div class="page-title-box">
                    <h4 class="page-title">Profile</h4>
                </div>
            </div>
            
            <div class="row">
                <div class="col-sm-8">
                    <div class="bg-picture card-box">
                        <div class="profile-info-name">
                            <img src="#" class="rounded-circle avatar-xl img-thumbnail float-left mr-3" alt="profile-image"/>
                            
                            <div class="profile-info-detail overflow-hidden">
                                <h4 class="m-0">Name: </h4>
                                <p>Email: </p>
                                <p>Username: </p>
                                <p>Date Joined: </p>
                            </div>
                            
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );

        }
    }

export default connect()(Recipes);