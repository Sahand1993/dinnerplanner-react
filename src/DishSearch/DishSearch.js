import React, {Component} from "react";
import "./DishSearch.css";
import {modelInstance} from "../data/DinnerModel";

class DishSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: "Enter keyword",
            dishType: "main dish",
        }
        this.handleChangeQuery = this.handleChangeQuery.bind(this);
        this.handleChangeDishType = this.handleChangeDishType.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }
    handleChangeQuery(event){
        this.setState({
            query: event.target.value,
        });
    }
    handleChangeDishType(event){
        this.setState({
            dishType: event.target.value,
        });
    }
    handleSearchClick(event){
        this.setState({
            status:"LOADING",
        });
        modelInstance.getAllDishes(this.state.query, this.state.dishType)
            .then(dishes=>{
                this.setState({
                    status:"LOADED",
                    dishes: dishes.results,
                });
            })
            .catch(()=>{
                this.setState({
                    status:"ERROR",
                });
            })
    }

    render(){
        return(
           <div className="DishSearch">
            <div className="">
              <h4>Find a dish</h4>
            </div>
            <div className="keyword">
              <input defaultValue={this.state.query} id="searchbar" type="text" className="form-control" onChange={this.handleChangeQuery}/>
            </div>
            <div id="dishsearcher-select" className="select">
              <select value={this.state.dishType} onChange={this.handleChangeDishType} id="select" className="form-control">
                <option value="main dish">Main Course</option>
                <option value="side">Side Dish</option>
                <option value="dessert">Dessert</option>
                <option value="starter">Appetizer</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            <div className="search"> 
              <button id="search-button" type="button" className="btn btn-default" onClick={()=>this.props.onSearch(this.state.query, this.state.dishType)}>search</button>
            </div>
          </div> 
        );
    }
}

export default DishSearch;