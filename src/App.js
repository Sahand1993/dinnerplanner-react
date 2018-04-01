import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import DishDetails from "./DishDetails/DishDetails";
import Confirm from "./Confirm/Confirm";
import Print from "./Print/Print";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="topdiv">
              <h1 className="App-title">{this.state.title}</h1>
          </div>
          {/* We render different components based on the path */}
        
        </header>
        
        <Route exact path="/" component={Welcome}/>
        <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
        <Route path="/details/:id" component={DishDetails}/>
        <Route path="/confirm" component={Confirm}/>
        <Route path="/print" component={Print}/>
      </div>
    );
  }
}

export default App;
