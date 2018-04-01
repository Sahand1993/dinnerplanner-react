import React, {Component} from "react";
import {modelInstance} from "../data/DinnerModel";
import {Link} from "react-router-dom";
import "./ConfirmHead.css";

class ConfirmHead extends Component{
    render(){
        return(
        <div id="summaryheader" className="ConfirmHead">
            <div className="row dinner-overview-header">
                <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12">
                    <h3>My Dinner: {modelInstance.getNumberOfGuests()} people</h3>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                    <Link to="/search">
                        <button id="overview-backbutton" type="button" className="btn btn-default">Go back and edit dinner</button>
                    </Link>
                </div>
            </div>
        </div>
        );
    }
}

export default ConfirmHead;