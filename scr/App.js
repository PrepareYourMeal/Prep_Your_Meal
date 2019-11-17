import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";


const Profile = () => <div>You're on the Profile Tab</div>;
const Refrigerator = () => <div>You're on the Refrigerator Tab</div>;
const My_Recipes = () => <div><card /> </div>;
const Favorites = () => <div>You're on the Favorites Tab</div>;
const Seasonal = () => <div>You're on the Seasonal Tab</div>;
const Planner = () => <div>You're on the Planner Tab</div>;


class App extends Component {
  render() {
    const { path } = this.props.match;
   
    return (
      
      <div>
        <h1>Stove & Oven</h1>
        <div className="links">
          <Link to={`${path}`} className="link">Profile</Link>
          <Link to={`${path}/Refrigerator`} className="link">Refrigerator</Link>
          <Link to={`${path}/My_Recipes`} className="link">My_Recipes</Link>
          <Link to={`${path}/Favorites`} className="link">Favorites</Link>
          <Link to={`${path}/Seasonal`} className="link">Seasonal</Link>
          <Link to={`${path}/Planner`} className="link">Planner</Link>
        </div>
        <div className="tabs">
          <Switch>
            <Route path={`${path}`} exact component={Profile} />
            <Route path={`${path}/Refrigerator`} component={Refrigerator} />
            <Route path={`${path}/My_Recipes`} component={My_Recipes} />
            <Route path={`${path}/Favorites`} component={Favorites} />
            <Route path={`${path}/Seasonal`} component={Seasonal} />
            <Route path={`${path}/Planner`} component={Planner} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;