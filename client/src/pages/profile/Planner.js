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


class Planner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser()
        };
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

                                <h4 className="page-title">Planner</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Monday
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Tuesday
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Wednesday
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Thursday
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                   Friday
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Planner);