import React, {Component} from 'react';
import './Dishes.css';
import {Link} from "react-router-dom";
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly


class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      dishes: props.dishes,
    };
  }

  render() {
    let dishesList;
  
    dishesList = this.state.dishes.map((dish) =>
      <div key={dish.id} className="dishsearch-dish handhover">
        <div id={dish.id} className="imgframe">
          <Link to={{
            pathname: "/details/"+dish.id+"/"+this.state.query+"/"+this.state.dishType,
            }}>
          <img src={"https://spoonacular.com/recipeImages/"+dish.image} className="dishsearch-img" alt="img"/>
          <p>{dish.title}</p>
          </Link>
        </div>
      </div>
    )
  

    return dishesList;
  }
}

export default Dishes;
