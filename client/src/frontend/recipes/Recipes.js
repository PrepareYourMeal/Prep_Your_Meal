import React, {Component, useEffect} from 'react';
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
    Button,
    ButtonGroup,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import RecipeDetails from './RecipeDetails';
import queryString from 'query-string';


class Recipes2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: props.isAuthenticated,
            recipes: [],
            page: 0,
            favourites: [],
            vegan: false,
            dairyFree: false,
            vegetarian: false,
            ketogenic: false,
            glutenFree: false
        };

        // if (props.user !== null) {
        //     this.setFavourite();
        // }

        // this.setFavourite.bind(this);
        this.addFavourite.bind(this);
        this.applyVegan.bind(this);
        this.applyDairyFree.bind(this);
        this.getRecipe.bind(this)
        this.applyVegetarian.bind(this);
        this.applyglutenFree.bind(this);
        this.applyKetogenic.bind(this);
    }

    // async componentDidMount() {
    //     console.log("Did Mount");
    //     // let query = queryString.parse(this.props.location.search);

    //   }

    // setFavourite() {
    //     this.setState({ favourites: this.props.user.favourites });
    // }

    async addFavourite(recipe) {
        let favourites = this.state.favourites;
        favourites.push(recipe)

        this.setState({ favourites: favourites })
        let token = localStorage.getItem("accessJWT");
        // let favourites = this.state.favourites;
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };
        
        
        await axios.put(`/api/users/${token}/favourites`,{ recipe: recipe }, options);
        console.log('done');


    }

    applyVegan() {
        this.setState({ vegan: true, dairyFree: false, vegetarian: false, ketogenic: false, glutenFree: false });
        this.getRecipe();
    }

    applyDairyFree() {
        this.setState({ vegan: false, dairyFree: true, vegetarian: false, ketogenic: false, glutenFree: false });
        this.getRecipe();
    }

    applyVegetarian() {
        this.setState({ vegan: false, dairyFree: false, vegetarian: true, ketogenic: false, glutenFree: false });
        this.getRecipe();
    }

    applyglutenFree() {
        this.setState({ vegan: false, dairyFree: false, vegetarian: false, ketogenic: false, glutenFree: true });
        this.getRecipe();
    }

    applyKetogenic() {
        this.setState({ vegan: false, dairyFree: false, vegetarian: false, ketogenic: true, glutenFree: false });
        this.getRecipe();
    }

    getRecipe(page) {
        const url = `http://www.localhost:5000/api/recipes/?size=12&page=${page}&vegan=${this.state.vegan}&dairyFree=${this.state.dairyFree}&vegetarian=${this.state.vegetarian}&ketogenic=${this.state.ketogenic}&glutenFree=${this.state.glutenFree}`;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ recipes: data })
          console.log(this.state.recipes)
          this.props.history.push('/recipes');
         })
    }

    componentWillMount() {
        console.log("Will mount")
        this.getRecipe();
        this.setState({
            isAuthenticated: this.props.isAuthenticated,
        })
      }

    // async componentWillUnmount() {

    //     let token = localStorage.getItem("accessJWT");
    //     let favourites = this.state.favourites;
    //     const options = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         withCredentials: true
    //     };
        
        
    //     await axios.put(`/api/users/favourite?token=${token}`,{ favourites: favourites }, options);
    //     console.log('done');
    // }

    // componentWillUpdate() {
    //     this.getRecipe();
    // }
      
    render() {
        // this.getRecipe();

        return (
            // <React.Fragment>
                <div className="container">
                    {/* preloader */}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h1 className="page-title">My Recipes</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col lg={12} >
                    <div className="container">
                        <ButtonGroup>
                            <Button onClick={() => this.applyVegan()}>Vegan</Button>
                            <Button onClick={() => this.applyDairyFree()}>Dairy Free</Button>
                            <Button onClick={() => this.applyGlutenFree()}>Gluten Free</Button>
                            <Button onClick={() => this.applyKetogenic()}>Ketogenic</Button>
                            <Button onClick={() => this.applyVegetarian()}>Vegetarian</Button>
                        </ButtonGroup>
                        <Pagination aria-label="Page navigation example">
                            <PaginationItem>
                                <PaginationLink first href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink previous href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                <span onClick={() => this.getRecipe(1)}>1</span>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                3
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                4
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                5
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last href="#" />
                            </PaginationItem>
                        </Pagination>
                    </div>

                    </Col>
                    </Row>

                    <Row>
                        {/* <Col lg={3}>
                            <Card>
                                <CardBody>
                                    Filter
                                </CardBody>
                            </Card>
                        </Col> */}
                        {this.state.recipes.map((recipe, index) => (

                        <Col lg={3} key={index}>
                            <CardDeck>

                                <Card className="gal-detail thumb card" height="60%">
                                    <CardImg alt="Card image cap" src={recipe.imageUrl} top width="100%"/>
                                    <CardBody>
                                        <p class="text-center"><small>{recipe.title}</small></p>                                        
                                        {/* <CardSubtitle>{recipe.servings}</CardSubtitle> */}
                                        {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                        <Link to={{pathname:`/recipes/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                        <Button onClick={() => this.addFavourite(recipe)} color="secondary" className="btn-block" type="button">Favourite</Button>
                                       
                                    </CardBody>
                                </Card>
                                </CardDeck>
                        </Col>
                        ))
                        }
                    </Row>

                    
                </div>
            
        )
    }
}



export default Recipes2;
