import React, {Component} from "react";
import "./ConfirmReel.css";
import {modelInstance} from "../data/DinnerModel";

class ConfirmReel extends Component{
    render(){
        let dishes = modelInstance.getFullMenu().map((dish, index)=>
            <div key={index} className="dinneroverview-dish">
                <div className="div">
                    <div className="imgframe">
                        <img alt={dish.id} src={dish.image} className="overview-img"/>
                        <p>{dish.title}</p>
                    </div>
                    <span className="pricetag">{(dish.pricePerServing*modelInstance.getNumberOfGuests()).toFixed(2)+" SEK"}</span>
                </div>
            </div>
        );
        let prices = modelInstance.getFullMenu().map((dish)=>
            dish.pricePerServing*modelInstance.getNumberOfGuests()
        );
        let total = prices.reduce((total, num)=>total+num, 0);
        
        return(
            <div id="dinnerOverview" className="ConfirmReel">
                <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-7 col-xs-12 col-centered menuwrapper">
                    <div className="dinneroverview-menu">
                    <div id="dinneroverview-dishes">
                        {dishes}
                        <div className="menutotal">
                            <div className="floatdiv">
                                <span className="total-label">Total:</span>
                                <span className="dinnertotal">{total.toFixed(2)+" SEK"}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
export default ConfirmReel;