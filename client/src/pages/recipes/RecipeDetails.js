import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Separator, Colxx} from "../../components/CustomBootstrap";
import '../../assets/home_page/css/style.css';
import '../../assets/home_page/css/colors/green.css';
import axios from "axios"
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
import _ from 'lodash';
import PropTypes from 'prop-types';

import {getLoggedInUser} from '../../helpers/authUtils';
import Loader from '../../components/Loader';

const API_KEY = "ee27b4945bac5d6b09bb80d78d93c6a9";

class RecipeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            activeFirstTab: "1",
            activeRecipe: [],
        };
    }

        
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({activeFirstTab: tab});
        }
    }

    componentDidMount = () => {
        const url ='http://localhost:5000/api/recipes?size=12';
        axios.get(url).then(response => response.data)
        .then((data) => {
            console.log(data)
         })
        // console.log(this.props.location.pathname.split("/")[2])
        // console.log(this.props.location.state)
        this.setState({activeRecipe: this.props.location.state})
        console.log(this.state)
        // setTimeout(() => {
        //     console.log(this.state.activeRecipe.recipe.title)
        // }, 200);

    }

   
  
    render() {
     
        return (
            <div className="container" itemScope>
            {/* Recipe */}

            <div className="twelve columns">

              <div className="alignment">

                {/* Header */}
                <section className="recipe-header">
                <div className="margin-top-100" />

                  <div className="title-alignment">            
                  

                    <h2>{ this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.title : "Title"}</h2>
                    <div className="rating five-stars">
                      <div className="star-rating" />
                      <div className="star-bg" />
                    </div>
                    <span>
                      <a href="#reviews">(4 reviews)</a>
                    </span>
                  </div>
                </section>
                {/* Slider */}
                <div className="recipeSlider rsDefault">
                  <img
                    itemProp="image"
                    className="rsImg" 
                    src={ this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.imageUrl : "imageUrl" }
                    alt
                  />
                 
                </div>
                {/* Details */}
                <section className="recipe-details" itemProp="nutrition">
                  <ul>
                    <li>
                      Serves: <strong itemProp="recipeYield"> {this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.servings : "servings"} people</strong>
                    </li>
                    <li>
                      Prep Time: <strong itemProp="prepTime"> {this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.readyInMinutes : "readyInMinutes"} mins</strong>
                    </li>
                    <li>
                      Cooking: <strong itemProp="cookTime">{this.state.activeRecipe.recipe ? this.state.activeRecipe.recipe.preparationMinutes : "preparationMinutes"} mins</strong>
                    </li>
                    <li>
                      Calories: <strong itemProp="calories">632 kcal</strong>
                    </li>
                  </ul>
                  <a href="#" className="print">
                    <i className="fa fa-print" /> Print
                  </a>
                  <div className="clearfix" />
                </section>
                
                <h3>Ingredients</h3>

                <ul className="ingredients">
                     {
                        this.state.activeRecipe.recipe?this.state.activeRecipe.recipe.ingredients.map((item)=>{
                            return(
                                <li>
                                <input id="check" type="checkbox" name="check" value="check"/>
                                <label itemprop="ingredients" for="check">
                                    {item.quantity} {item.unit} {item.name}
                                </label>
                                </li>
                            )
                        }):""
                    }
                </ul>
               
                
                {/* Directions */}
                <h3>Directions</h3>
                <ol className="directions" itemProp="recipeInstructions">
                {
                        this.state.activeRecipe.recipe?this.state.activeRecipe.recipe.instructions.map((item)=>{
                            return(
                                <li>

                                    {item}
                                </li>
                            )
                        }):""
                    }

                </ol>
              
                <div className="clearfix" />
        
                <div className="margin-bottom-40" />
              
              
                <div className="clearfix" />
                <div className="margin-top-15" />
              </div>
            </div>
         
          </div>

        );
    }
}


export default connect()(RecipeDetails);
