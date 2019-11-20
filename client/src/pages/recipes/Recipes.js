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
import '../../assets/home_page/css/style.css';
import '../../assets/home_page/css/colors/green.css';

class Recipes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            recipes: []
        };
    }

    componentDidMount() {
        const url ='http://localhost:5000/api/recipes?size=12';
        axios.get(url).then(response => response.data)
        .then((data) => {
            console.log(data)
          this.setState({ recipes: data })
          console.log(this.state.recipes)
         })
      }
      
    render() {

        return (
            <React.Fragment>
        <div class="advanced-search-container">
            <div class="container">
                <div class="sixteen columns">
                    <div id="advanced-search">
                        <div class="select">
                            <label>Choose category</label>
                            <select data-placeholder="Choose Category" class="chosen-select-no-single">
                                <option value="1">All</option>
                                        <option value="2">Breakfast</option>
                                        <option value="3">Lunch</option>
                                        <option value="4">Beverages</option>
                                        <option value="5">Appetizers</option>
                                        <option value="6">Soups</option>
                                        <option value="7">Salads</option>
                                        <option value="8">Beef</option>
                                        <option value="9">Poultry</option>
                                        <option value="10">Pork</option>
                                        <option value="11">Seafood</option>
                                        <option value="12">Vegetarian</option>
                                        <option value="13">Vegetables</option>
                                        <option value="14">Desserts</option>
                                        <option value="15">Canning / Freezing</option>
                                        <option value="16">Breads</option>
                                        <option value="17">Holidays</option>
                                    </select>
                                </div>

                                <div class="select included-ingredients">
                                    <label>Select one or more ingredients that should be included in recipe</label>
                                    <select data-placeholder="Included Ingredients" class="chosen-select" multiple>
                                        <option value="sugar">sugar</option>
                                        <option value="wheat-flour">wheat flour</option>
                                        <option value="baking-powder">baking powder</option>
                                        <option value="eggs">eggs</option><option value="salt">salt</option>
                                        <option value="brown-sugar">brown sugar</option>
                                        <option value="chicken-breast">chicken breast</option>
                                        <option value="garlic">garlic</option>
                                        <option value="milk">milk</option>
                                        <option value="oil">oil</option>
                                        <option value="sesame-oil">sesame oil</option>
                                        <option value="soy-sauce">soy sauce</option>
                                        <option value="butter">butter</option>
                                        <option value="carrots">carrots</option>
                                        <option value="coconut-flakes">coconut flakes</option>
                                        <option value="honey">honey</option>
                                        <option value="mung-bean-sprouts">mung bean sprouts</option>
                                        <option value="noodles">noodles</option>
                                        <option value="onion">onion</option>
                                        <option value="potato-starch">potato starch</option>
                                        <option value="red-bell-pepper">red bell pepper</option>
                                        <option value="walnuts">walnuts</option>
                                        <option value="water">water</option>
                                        <option value="almonds">almonds</option>
                                        <option value="baking-soda">baking soda</option>
                                        <option value="beef-brisket">beef brisket</option>
                                        <option value="beef-sirloin">beef sirloin</option>
                                        <option value="bell-pepper">bell pepper</option>
                                        <option value="broth">broth</option>
                                        <option value="carrot">carrot</option>
                                        <option value="cherries">cherries</option>
                                        <option value="chocolate">chocolate</option>
                                        <option value="cinnamon">cinnamon</option>
                                        <option value="cinnamon-stick">cinnamon stick</option>
                                        <option value="cocoa-powder">cocoa powder</option>
                                        <option value="coconut">coconut</option>
                                        <option value="corn-tortillas">corn tortillas</option>
                                        <option value="dark-chocolate">dark chocolate</option>
                                        <option value="dried-black-mushrooms">dried black mushrooms</option>
                                        <option value="dried-soba">dried soba</option>
                                        <option value="egg">egg</option>
                                        <option value="five-spice-powder">five spice powder</option>
                                        <option value="flour">flour</option>
                                        <option value="ginger">ginger</option>
                                        <option value="guilin-chili-sauce">guilin chili sauce</option>
                                        <option value="leek">leek</option>
                                        <option value="lettuce">lettuce</option>
                                        <option value="olive-oil">olive oil</option>
                                        <option value="oyster-sauce">oyster sauce</option>
                                        <option value="pear-juice">pear juice</option>
                                        <option value="pepper">pepper</option>
                                        <option value="pineapple">pineapple</option>
                                        <option value="red-onion">red onion</option>
                                        <option value="redcurrant">redcurrant</option>
                                        <option value="ribs-of-celery">ribs of celery</option>
                                        <option value="sichuan-pepper">Sichuan pepper</option>
                                        <option value="spring-onions">spring onions</option>
                                        <option value="strawberries">strawberries</option>
                                        <option value="taiwanese-golden-mushrooms">Taiwanese golden mushrooms</option>
                                        <option value="yeast">yeast</option>
                                        <option value="yellow-bell-pepper">yellow bell pepper</option>
                                    </select>
                                </div>

                                <div class="select">
                                    <label>Recipe needs to have</label>
                                    <select data-placeholder="Choose Category" class="chosen-select">
                                        <option value="1">All of selected ingredients </option>
                                        <option value="2">Any of selected ingredients</option>
                                    </select>
                                </div>
                                
                                <div class="clearfix"></div>

                                <nav class="search-by-keyword">
                                    <form action="#" method="get">
                                        <button><span>Search for Recipes</span><i class="fa fa-search"></i></button>
                                        <input class="search-field" type="text" placeholder="Search by keyword" value=""/>
                                    </form>
                                </nav>
                                <div class="clearfix"></div>


                                <a href="#" class="adv-search-btn">Advanced Search <i class="fa fa-caret-down"></i></a>


                                <div class="extra-search-options closed">


                                    <div class="select excluded-ingredients">
                                        <label>Select one or more ingredients that should be excluded from recipe</label>
                                        <select data-placeholder="Excluded Ingredients" class="chosen-select" multiple>
                                            <option value="sugar">sugar</option>
                                            <option value="wheat-flour">wheat flour</option>
                                            <option value="baking-powder">baking powder</option>
                                            <option value="eggs">eggs</option><option value="salt">salt</option>
                                            <option value="brown-sugar">brown sugar</option>
                                            <option value="chicken-breast">chicken breast</option>
                                            <option value="garlic">garlic</option>
                                            <option value="milk">milk</option>
                                            <option value="oil">oil</option>
                                            <option value="sesame-oil">sesame oil</option>
                                            <option value="soy-sauce">soy sauce</option>
                                            <option value="butter">butter</option>
                                            <option value="carrots">carrots</option>
                                            <option value="coconut-flakes">coconut flakes</option>
                                            <option value="honey">honey</option>
                                            <option value="mung-bean-sprouts">mung bean sprouts</option>
                                            <option value="noodles">noodles</option>
                                            <option value="onion">onion</option>
                                            <option value="potato-starch">potato starch</option>
                                            <option value="red-bell-pepper">red bell pepper</option>
                                            <option value="walnuts">walnuts</option>
                                            <option value="water">water</option>
                                            <option value="almonds">almonds</option>
                                            <option value="baking-soda">baking soda</option>
                                            <option value="beef-brisket">beef brisket</option>
                                            <option value="beef-sirloin">beef sirloin</option>
                                            <option value="bell-pepper">bell pepper</option>
                                            <option value="broth">broth</option>
                                            <option value="carrot">carrot</option>
                                            <option value="cherries">cherries</option>
                                            <option value="chocolate">chocolate</option>
                                            <option value="cinnamon">cinnamon</option>
                                            <option value="cinnamon-stick">cinnamon stick</option>
                                            <option value="cocoa-powder">cocoa powder</option>
                                            <option value="coconut">coconut</option>
                                            <option value="corn-tortillas">corn tortillas</option>
                                            <option value="dark-chocolate">dark chocolate</option>
                                            <option value="dried-black-mushrooms">dried black mushrooms</option>
                                            <option value="dried-soba">dried soba</option>
                                            <option value="egg">egg</option>
                                            <option value="five-spice-powder">five spice powder</option>
                                            <option value="flour">flour</option>
                                            <option value="ginger">ginger</option>
                                            <option value="guilin-chili-sauce">guilin chili sauce</option>
                                            <option value="leek">leek</option>
                                            <option value="lettuce">lettuce</option>
                                            <option value="olive-oil">olive oil</option>
                                            <option value="oyster-sauce">oyster sauce</option>
                                            <option value="pear-juice">pear juice</option>
                                            <option value="pepper">pepper</option>
                                            <option value="pineapple">pineapple</option>
                                            <option value="red-onion">red onion</option>
                                            <option value="redcurrant">redcurrant</option>
                                            <option value="ribs-of-celery">ribs of celery</option>
                                            <option value="sichuan-pepper">Sichuan pepper</option>
                                            <option value="spring-onions">spring onions</option>
                                            <option value="strawberries">strawberries</option>
                                            <option value="taiwanese-golden-mushrooms">Taiwanese golden mushrooms</option>
                                            <option value="yeast">yeast</option>
                                            <option value="yellow-bell-pepper">yellow bell pepper</option>
                                        </select>
                                    </div>

                                    <div class="select alergens">
                                        <label>Choose alergens</label>
                                        <select data-placeholder="Choose Alergens" class="chosen-select" multiple>
                                            <option value="2">Peanut</option>
                                            <option value="3">Tree nuts</option>
                                            <option value="4">Milk</option>
                                            <option value="5">Egg</option>
                                            <option value="6">Wheat</option>
                                            <option value="7">Soy</option>
                                            <option value="8">Fish</option>
                                            <option value="9">Shellfish</option>
                                        </select>
                                    </div>


                                    <div class="clearfix"></div>


                                    <div class="select">
                                        <label>Choose level</label>
                                        <select data-placeholder="Choose level" class="chosen-select">
                                            <option value="1">All</option>
                                            <option value="2">Easy</option>
                                            <option value="3">Medium</option>
                                            <option value="4">Hard</option>
                                            <option value="5">Master</option>
                                        </select>
                                    </div>

                                    <div class="select">
                                        <label>Choose serving</label>
                                        <select data-placeholder="Choose level" class="chosen-select">
                                            <option value="1">All</option>
                                            <option value="2">for 1 person</option>
                                            <option value="3">for 2 people</option>
                                            <option value="5">for 4 people</option>
                                            <option value="6">for family</option>
                                        </select>
                                    </div>

                                    <div class="select">
                                        <label>Choose time needed</label>
                                        <select data-placeholder="Choose time needed" class="chosen-select">
                                            <option value="1">All</option>
                                            <option value="2">Half an hour</option>
                                            <option value="3">Less than hour</option>
                                            <option value="3">More than hour</option>
                                        </select>
                                    </div>

                                    <div class="clearfix"></div>
                                    <div class="margin-top-10"></div>

                                </div>

                            <div class="clearfix"></div>
                            </div>

                        </div>
                    </div>
        </div>
                
                  <div className="">
                      {/* preloader */}
                      {
                      this.props.loading && <Loader/>
                  }
  
                      <Row>
                          <Col lg={12}>
                              <div className="page-title-box">
  
                                  <h1 className="page-title">My Recipes</h1>
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
                                          <Link to={{pathname:`/recipe/${recipe.spoon_id}`, state:{recipe:recipe}}}><Button color="secondary" className="btn-block" type="button">View Details</Button></Link>
                                         
                                      </CardBody>
                                  </Card>
                                  </CardDeck>
                          </Col>
                          ))
                          }
                      </Row>
                  </div>
              </React.Fragment>
 
        )

    }
}



export default connect()(Recipes);
