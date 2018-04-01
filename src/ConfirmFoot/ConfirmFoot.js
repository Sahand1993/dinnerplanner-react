import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./ConfirmFoot.css";

class ConfirmFoot extends Component{
    render(){
        return(
            <div className="row confirmfoot">
                <div className="col-lg-8 col-md-8 col-sm-10 col-centered menubottomline"></div>
                <div className="col-lg-12 printbuttonwrapper">
                    <Link to="print">
                        <button id="overview-printbutton" type="button" className="printbutton btn btn-default">Print full recipe</button>
                    </Link>
                </div>
            </div>
        );
    }
}
export default ConfirmFoot;