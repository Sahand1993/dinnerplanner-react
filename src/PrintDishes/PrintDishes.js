import React, {Component} from "react";
import "./PrintDishes.css";
import {modelInstance} from "../data/DinnerModel";

class PrintDishes extends Component{
    render(){
        let dishes = modelInstance.getFullMenu().map((dish)=>
            <div key={dish.id} className="dinnerprintout-row col-centered row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 dinnerprintout-dish">
                    <div className="col-lg-10 col-md-12 col-sm-12 col-xs-7 dinnerprintout-img-and-text">
                        <div className="dinnerprintout-img">
                            <img alt="printimg" src={dish.image}/>
                        </div>
                        <div className="dinnerprintout-dishtext">
                            <h4>{dish.title}</h4>
                            <p>{dish.dishType}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-4 col-xs-12 dinnerprintout-preparation">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-7 dinnerprintout-preparation-wrapper">
                        <h4>Preparation</h4>
                        <p>{dish.instructions}</p>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="dinnerprintout">
                {dishes}
            </div>
        );
    }
}

export default PrintDishes;