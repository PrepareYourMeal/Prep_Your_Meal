import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, CardTitle, Button, UncontrolledCollapse, ListGroup, ListGroupItem, Card, CardImg, CardText, CardBody, CardDeck } from 'reactstrap';

import { getLoggedInUser } from '../helpers/authUtils';
import Loader from '../components/Loader';
import queryString from 'query-string';
import axios from 'axios';


class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            inventory: [],
            favourites: [],
            grocery: []
        };
        this.removeIngredient.bind(this);
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        if (query.token) {
            console.log("2")

            let userId = query.userId;
            let token = query.token;
            window.localStorage.setItem("accessJWT", token);
            console.log("3")
            const url = `/api/users/?token=${token}`;
            axios.get(url, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ user: data })
                console.log(this.state.user)
                this.props.authenticate();
                this.props.history.push('/dashboard');
            })
            .catch((e) => {
                console.log(e)
            })
        }

        console.log(document.cookie);
        console.log("1")
        let token = window.localStorage.getItem('accessJWT')
        if (token) {
            console.log("2")
            const url3 = `/api/users/?token=${token}`;
            axios.get(url3, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ user: data })
                console.log(this.state.user)
            })
            .catch((e) => {
                console.log(e)
            })

            // let userId = query.userId;
            // let token = query.token;
            // window.localStorage.setItem("accessJWT", token);
            console.log("3")
            const url = `/api/users/${token}/inventory`;
            axios.get(url, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ inventory: data })
            })
            .catch((e) => {
                console.log(e);
            })

            const url1 = `/api/users/${token}/favourites`
            axios.get(url1, { withCredentials: true }).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ favourites: data })
                console.log(this.state.favourites)
                // this.props.history.push('/dashboard');
            })
            .catch((e) => {
                console.log(e);
            })

            const url2 = `/api/users/${token}/planner/grocery`;
            axios.get(url2, { withCredentials: true })
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ grocery: data })
                console.log(this.state.grocery)
            })
        }
    }

    removeIngredient(ingi_id) {
        let token = window.localStorage.getItem('accessJWT')
        const url = `/api/users/${token}/inventory/${ingi_id}`
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let inventory = this.state.inventory;
            const removeIndex = inventory.map(item => item.spoon_id).indexOf(ingi_id);
            inventory.splice(removeIndex, 1);
            this.setState({ inventory: inventory });
            console.log(r.status);
            console.log(this.state.inventory)
        })
        .catch(e => console.log(e))
    }
    removeFavourite(rec_id) {
        let token = window.localStorage.getItem('accessJWT')
        const url = `/api/users/${token}/favourites/${rec_id}`
        axios.delete(url, { withCredentials: true })
        .then(r => {
            let favourites = this.state.favourites;
            const removeIndex = favourites.map(item => item.spoon_id).indexOf(rec_id);
            favourites.splice(removeIndex, 1);
            this.setState({ favourites: favourites });
            console.log(r.status);
            console.log(this.state.favourites)
        })
        .catch(e => console.log(e))
    }

    render() {
        // let { name, inventory } = this.state.user

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col>
                            <div className="page-title-box">

                                <h4 className="page-title">Profile</h4>
                            </div>
                        </Col>
                        <Col>
                            <div className="page-title-box">

                                <h4 className="page-title">My Favourites</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Button id="toggler" style={{ marginBottom: '1rem', float: "right" }}>
                                User Info
                                </Button>
                                <UncontrolledCollapse toggler="#toggler">
                                <Card>
                                    <CardBody>
                                        <h3>{this.state.user.name}</h3>
                                        <CardImg src={this.state.user.photo} style={{width: 200, height: 200, borderRadius: 150/2, overflow: "hidden", borderWidth: 3}}/>
                                    </CardBody>
                                </Card>
                                </UncontrolledCollapse>
                            </Row>
                            <Row>
                                <Card body>
                                    <CardTitle><h3>Whats in my Fridge?</h3></CardTitle>
                                    <ListGroup flush>
                                    {this.state.inventory.map((ingredient, index) => (
                                        <ListGroupItem>
                                            <strong>{ingredient.name}</strong>
                                            <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeIngredient(ingredient.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                                        </ListGroupItem>
                                    ))}
                                    </ListGroup>
                                </Card>
                            </Row>
                            <Row>
                                <Card body>
                                    <CardTitle><h3>Grocery List</h3></CardTitle>
                                    <a href="javascript:window.print()" className="print">
                                        <i className="fa fa-print" /> Print
                                    </a>
                                    <div className="clearfix" />
                                    <ListGroup flush>
                                    {this.state.grocery.map((ingredient, index) => (
                                        <ListGroupItem>
                                            <strong>{ingredient.name}</strong>
                                        </ListGroupItem>
                                    ))}
                                    </ListGroup>
                                </Card>
                            </Row>
                        </Col>
                        <Col>
                        <Row>
                            {this.state.favourites.map((recipe, index) => (
                                <Col lg={4}>
                                <Card key={index}>
                                    <CardImg top width="100%" src={recipe.imageUrl} />
                                    <CardBody>
                                        <CardTitle><h4><Link to={{pathname:`/recipe/?spoon_id=${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h4></CardTitle>
                                        <span style={{float: "right"}}><Button size='sm' onClick={() => this.removeFavourite(recipe.spoon_id)}><i className="fa fa-trash-alt" /></Button></span>
                                    </CardBody>
                                </Card>
                                </Col>
                            ))}

                        </Row>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(DefaultDashboard);
