import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    CardDeck,
    Collapse, 
    CardHeader,
    CardFooter,
    CardSubtitle,
    Button
} from 'reactstrap';

import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class Recipes extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            recipes: []
        };
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
                                <h4 class="m-0">Name: { this.state.user.firstName ? this.state.user.firstName : "firstName"} { this.state.user.lastName ? this.state.user.lastName : "lastName"}</h4>
                                <p>Email: </p>
                                <p>Username: { this.state.user.username ? this.state.user.username : "username"}</p>
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