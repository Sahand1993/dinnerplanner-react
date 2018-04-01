import React, { Component } from 'react';
import {modelInstance} from "../data/DinnerModel";
import {Link} from "react-router-dom";
import './Sidebar.css';

class Sidebar extends Component {

  constructor(props) {
    super(props)
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menu: modelInstance.getFullMenu(),
    }
    modelInstance.addObserver(this);
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    modelInstance.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  handleChangeGuests(event){
    let noOfGuests = event.target.value;
    modelInstance.setNumberOfGuests(noOfGuests);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menu: modelInstance.getFullMenu(),
    })
  }

  render() {
    //console.log(this.state.menu);
    let menu = this.state.menu.map((dish)=>
      <div key={"menuitem-"+dish.id} className="menuitemwrapper">
        <div className="menuitem">
          <span className="dishname">{dish.title.substring(0,20)+"..."}</span>
          <span className="dishprice">{dish.pricePerServing*modelInstance.getNumberOfGuests()}</span>
        </div>
      </div> 
    );
    let total = this.state.menu.map((dish)=>
      dish.pricePerServing*modelInstance.getNumberOfGuests()
    );
    total = total.reduce((total, num)=>{return total+num}, 0);
    return (
      <div className="Sidebar" id="sidebar">
        <div>
          <div className="noofpeople">
            <div className="row noofpeople-wrapper">
              <h4>My Dinner</h4>
              <label>People <input defaultValue={modelInstance.getNumberOfGuests()} onChange={this.handleChangeGuests} id="numberOfGuests" min="0" type="number" className="form-control"/></label>
            </div>
          </div>
            <div id="dinneroverview" className="dinneroverview">
            <div className="dish-overview-header">
              <span className="dish-name">Dish name</span><span className="cost">Cost</span>
            </div>
            <div id="sidebar-dishes">   
              {menu}
            </div>                   
            <div className="dinneroverview-price">
              <span id="sidebar-total-price" className="dinneroverview-pricetag">{"SEK "+total}</span>
            </div>
            <div className="confirmbuttonwrapper">
              <Link to="/confirm">
                <button id="confirm" type="button" className="btn btn-default">Confirm Dinner</button>
              </Link>
            </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Sidebar;
