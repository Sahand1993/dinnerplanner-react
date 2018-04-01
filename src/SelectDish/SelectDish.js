import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import Hamburger from "../Hamburger/Hamburger";
import DishSearch from "../DishSearch/DishSearch";
import {modelInstance} from "../data/DinnerModel";

class SelectDish extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Hide sidebar when screen is small
      hideSidebar:true,
      width: 0,
      height: 0,
      status:"INITIAL",
      dishes: null,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }  

  handleSearch(query, dishType){
    this.setState({
      status:"LOADING",
    });
    modelInstance.getAllDishes(query, dishType)
      .then(dishes=>{
        this.setState({
          status:"LOADED",
          dishes: dishes.results,
        });
      })
      .catch((error)=>{
        console.error(error);
        this.setState({
          status:"ERROR",
        });
      })
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  hamburgerClick(){
    this.setState({
      hideSidebar:!this.state.hideSidebar,
    });
  }
  renderSidebar(){
    if(this.state.hideSidebar && this.state.width<767){
      return(null);
    }else{
      return <Sidebar />
    }
  }
  renderDishes(){
    switch(this.state.status){
      case "INITIAL":
        return <div className="search-prompt">Make a search!</div>;
      case "LOADING":
        return <div className="search-prompt">Loading...</div>;
      case "LOADED":
        return <Dishes dishes={this.state.dishes} />;
      default:
        return <div className="search-prompt">Error...</div>;
    }
  }
  render() {
    
    return (
      <div className="SelectDish">
        {/* We pass the model as property to the Sidebar component */}
        <Hamburger onClick={() => this.hamburgerClick()}/>
        {this.renderSidebar()}
        <DishSearch onSearch={(query, type) => this.handleSearch(query, type)}/>
        <div className="dishes">
          <div className="dishreel">
            {this.renderDishes()}
          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
