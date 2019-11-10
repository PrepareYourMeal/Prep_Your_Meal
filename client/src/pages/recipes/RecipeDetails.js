import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Separator, Colxx} from "../../components/CustomBootstrap";

import {
    Row,
    Card,
    CardTitle,
    CardBody,
    Col,
    CardImg,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    Badge,
    CardHeader,
    Table,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import {NavLink} from "react-router-dom";
import classnames from "classnames";

import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';

class RecipeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            activeFirstTab: "1",
            activeRecipe: []
        };
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({activeFirstTab: tab});
        }
    }

    componentDidMount = () => {
        console.log(this.props.location.pathname.split("/")[2])
        console.log(this.props.location.state)
        this.setState({activeRecipe: this.props.location.state})
        setTimeout(() => {
            console.log(this.state.activeRecipe.recipe.title)
        }, 200);

    }


    render() {
        const recipe = this.state.activeRecipe

        return (
            <React.Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Separator className="mb-5"/>

                        <h1>{
                            this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.title : "Title"
                        }</h1>
                        <Separator className="mb-4"/>

                        <div className="text-zero top-right-button-container"></div>
                        <Row>
                            <Colxx className="col-left" xl="5" xxs="12">
                                <Card className="mb-4">
                                    <CardBody>
                                        <CardImg alt="Card image cap" top width="100%"
                                            src={
                                                this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.imageUrl : "imageUrl"
                                            }/>

                                    </CardBody>
                                </Card>

                </Colxx>
                <Colxx className="col-right" xl="4" xxs="12">
                    <Card className="mb-4">
                        <CardBody>
                            <div className="mb-3">
                                <div className="post-icon mr-3 d-inline-block">
                                    <NavLink to="#">
                                        <i className="mdi mdi-account-clock-outline mr-1"></i>
                                    </NavLink>
                                    <span>{
                                        this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.preparationMinutes : "preparationMinutes"
                                    }</span>
                                </div>

                                <div className="post-icon mr-3 d-inline-block">
                                    <NavLink to="#">
                                        <i className=" mdi mdi-progress-clock mr-1"></i>
                                    </NavLink>
                                    <span>{
                                        this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.readyInMinutes : "readyInMinutes"}
                                    </span>
                                </div>
                            </div>
                            <p className="mb-3">
                                <h3>Instructions</h3>
                                <br/>
                                {this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.instructions : "instructions"} 
                            </p>
                        </CardBody>
                    </Card>
                  
                </Colxx>
            </Row>
        </Colxx>
    </Row>
</React.Fragment>

        );
    }
}


export default connect()(RecipeDetails);
