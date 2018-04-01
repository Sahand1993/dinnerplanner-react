import React, {Component} from "react";
import {modelInstance} from "../data/DinnerModel"
import "./IngredientsList.css"

class IngredientsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            ingredients: props.ingredients,
            pricePerServing: props.pricePerServing,
            id: props.id,
            noOfGuests: modelInstance.getNumberOfGuests(),
        }
        modelInstance.addObserver(this);
    }
    update(){
        if(this._ismounted===true){
            this.setState({
                noOfGuests: modelInstance.getNumberOfGuests(),
            });
        }
    }
    componentDidMount(){
        this._ismounted = true;
    }
    componentWillUnmount(){
        this._ismounted = false;
    }
    render () {
        var ingredientsList = this.state.ingredients.map((ingredient)=>
        <li key={ingredient.id}>
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    {ingredient.amount+" "+ingredient.unit}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    {ingredient.name}
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    {/*Empty because no price for ingredient*/}
                </div>
            </div>
        </li>
        );
        ingredientsList.push(
            <li key="total" className="total">
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        {(this.state.pricePerServing*this.state.noOfGuests).toFixed(2)+" SEK"} 
                    </div>
                </div>
            </li>
        );
        return (
            <div className="dish-ingredients">
                <div id="ingredients" className="ingredients-list col-lg-12">
                    <h4>{"Ingredients for "+this.state.noOfGuests+" people"}</h4>
                    <ul>{ingredientsList}</ul>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button onClick={() => this.props.onButtonClick()} type="button" className="btn btn-default">Add to menu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}   
export default IngredientsList;