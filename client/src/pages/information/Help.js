import React, {Component} from 'react';
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
    CardSubtitle,
    Button
} from 'reactstrap';

import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';

class Help extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            recipes: []
        };
    }
      
    render() {

        return (
            <React.Fragment>
                <div className="">
                    {/* preloader */}
                    {
                    this.props.loading && <Loader/>
                }

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">Help</h4>
                            </div>
                        </Col>
                    </Row>

                
                </div>
            </React.Fragment>
        )
    }
}



export default connect()(Help);
