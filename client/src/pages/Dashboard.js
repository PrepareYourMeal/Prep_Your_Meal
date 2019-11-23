import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

import { getLoggedInUser } from '../helpers/authUtils';
import Loader from '../components/Loader';
import queryString from 'query-string';
import axios from 'axios';

class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAuthenticated: false,
        }
        console.log(props)
        console.log(props.children)
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
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">My Refrigerator</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    Whats in your fridge?
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default DefaultDashboard;