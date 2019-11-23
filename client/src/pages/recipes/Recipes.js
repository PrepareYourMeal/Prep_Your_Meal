import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
import {
    Button,
    ButtonGroup,
} from 'reactstrap';

import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import RecipeDetails from './RecipeDetails';
import queryString from 'query-string';import '../../assets/home_page/css/style.css';
import '../../assets/home_page/css/colors/green.css';

class Recipes extends Component {

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
    }

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

    render() {

        return (
            <React.Fragment>  
                <div class="row">
                    <div class="col">
                    <div className="page-title-box">
                        <h1 className="page-title">My Recipes</h1>
                    </div>
                    </div>
                </div>
                <div className="row text-center">
                        <ButtonGroup>
                            <Button onClick={() => this.applyVegan()}>Vegan</Button>
                            <Button onClick={() => this.applyDairyFree()}>Dairy Free</Button>
                            <Button onClick={() => this.applyGlutenFree()}>Gluten Free</Button>
                            <Button onClick={() => this.applyKetogenic()}>Ketogenic</Button>
                            <Button onClick={() => this.applyVegetarian()}>Vegetarian</Button>
                        </ButtonGroup>
                    </div>
            <div class="isotope">
            <div class="row">
            {this.state.recipes.map((recipe, index) => (

                <div class="col-3">
                    <div class="card">
                    <div class="thumbnail-holder">
                        <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}>
                            <img src={recipe.imageUrl} alt="" />
                            <div class="hover-cover"></div>
                            <div class="hover-icon">View Recipe</div>
                        </Link>
                    </div>
    
                    <div class="recipe-box-content">
                        <h3><Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Link></h3>
    
                        <div class="rating five-stars">
                            <div class="star-rating"></div>
                            <div class="star-bg"></div>
                        </div>
                        {/* <Button onClick={() => this.addFavourite(recipe)} color="secondary" className="btn-block" type="button">Favourite</Button> */}

                        <div class="recipe-meta"><i class="fa fa-user"></i>{recipe.servings}   servings</div>
                        <div class="recipe-meta"><i class="fa fa-clock-o"></i>{recipe.readyInMinutes}  min</div>
    
                        <div className="margin-bottom-40"></div>

                    </div>
                    </div>
                </div>

             
            ))
        }   
        </div>

        </div>

       </React.Fragment> 

        )
    }
}


export default connect()(Recipes);
