import React, { Component } from 'react';
import { connect } from 'react-redux';

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

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class Bob extends Component {

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
          this.setState({ recipes: data })
          console.log(this.state.recipes)
         })
      }

      getData = () => {
        const url = 'http://localhost:5000/api/recipes?size=12'

        axios.get(url).then(response => response.data)
          .then((data) => {
          this.setState({recipes: data})
          console.log(this.state.recipes)
          })

      };

      getDataVegetarian = () => {
        const url = 'http://localhost:5000/api/recipes/?pageNo=1&size=10&vegetarian=true'

        axios.get(url).then(response => response.data)
          .then((data) => {
          this.setState({recipes: data})
          console.log(this.state.recipes)
          })

      };
      getDataVegan = () => {
        const url = 'http://localhost:5000/api/recipes/?pageNo=1&size=10&vegan=true'

        axios.get(url).then(response => response.data)
          .then((data) => {
          this.setState({recipes: data})
          console.log(this.state.recipes)
          })

      };
      getDataGlutenFree = () => {
        const url = 'http://localhost:5000/api/recipes/?pageNo=1&size=10&glutenFree=true'

        axios.get(url).then(response => response.data)
          .then((data) => {
          this.setState({recipes: data})
          console.log(this.state.recipes)
          })

      };
      getDataDairyFree = () => {
        const url = 'http://localhost:5000/api/recipes/?pageNo=1&size=10&dairyFree=true'

        axios.get(url).then(response => response.data)
          .then((data) => {
          this.setState({recipes: data})
          console.log(this.state.recipes)
          })

      };
      getDataKetogenic = () => {
        const url = 'http://localhost:5000/api/recipes/?pageNo=1&size=10&ketogenic=true'

        axios.get(url).then(response => response.data)
          .then((data) => {
          this.setState({recipes: data})
          console.log(this.state.recipes)
          })

      };

    render() {

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col lg={12}>
                            <div className="page-title-box">

                                <h4 className="page-title">Bob</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                <button
                                  onClick={() =>
                                    this.getData(this.state.recipes)
                                  }
                                >
                                  No Filter
                                </button>
                                   <button
                                     onClick={() =>
                                       this.getDataVegetarian(this.state.recipes)
                                     }
                                   >
                                     Vegetarian
                                   </button>

                                   <button
                                     onClick={() =>
                                       this.getDataVegan(this.state.recipes)
                                     }
                                   >
                                     Vegan
                                   </button>

                                   <button
                                     onClick={() =>
                                       this.getDataGlutenFree(this.state.recipes)
                                     }
                                   >
                                     Gluten Free
                                   </button>
                                   <button
                                     onClick={() =>
                                       this.getDataDairyFree(this.state.recipes)
                                     }
                                   >
                                     Dairy Free
                                   </button>
                                   <button
                                     onClick={() =>
                                       this.getDataKetogenic(this.state.recipes)
                                     }
                                   >
                                     Ketogenic Free
                                   </button>

                                </CardBody>

                            </Card>
                            <Card>
                                <CardBody>
                                   Bob2

                                   {this.state.recipes.map((recipe, index) => (

                                     <li style={{ padding: '10px' }} key={recipe.title}>
                                       <span style={{ color: 'black' }}> Spoonacular ID: </span> {recipe.spoon_id} <br />
                                       <span style={{ color: 'black' }}> Recipe Title: </span>
                                       {recipe.title}<br/>

                                       <br/>
                                       <span style={{ color: 'black' }}> Ingredients: </span>
                                       {
                                         recipe.ingredients.map((ingredient, index2) => (

                                           <li style={{ padding: '1px' }} key={ingredient.name}>
                                           <span style={{ color: 'black' }}> ingredient name: </span> {ingredient.name} <br />
                                           </li>

                                         ))
                                       }

                                       <br/><br/>


                                       <span style={{ color: 'black' }}> Vegetarian Filter: </span>
                                       {recipe.vegetarian.toString()}<br/>
                                       <span style={{ color: 'black' }}> Vegan Filter: </span>
                                       {recipe.vegan.toString()}<br/>
                                       <span style={{ color: 'black' }}> glutenFree Filter: </span>
                                       {recipe.glutenFree.toString()}<br/>
                                       <span style={{ color: 'black' }}> DairyFree Filter: </span>
                                       {recipe.dairyFree.toString()}<br/>
                                       <span style={{ color: 'black' }}> Ketogenic Filter: </span>
                                       {recipe.ketogenic.toString()}<br/>

                                       <br/>
                                       <span style={{ color: 'black' }}> Instructions: </span>
                                       {
                                         recipe.instructions.map((instruction, index3) => (

                                           <li style={{ padding: '1px' }} key={instruction}>
                                           <span style={{ color: 'black' }}> - </span> {instruction} <br />
                                           </li>

                                         ))
                                       }

                                       <br/><br/>

                                     </li>
                                   ))
                                 }


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Bob);
