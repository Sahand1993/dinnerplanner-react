import React, {Component} from "react";
import "./Confirm.css";
import ConfirmHead from "../ConfirmHead/ConfirmHead";
import ConfirmReel from "../ConfirmReel/ConfirmReel";
import ConfirmFoot from "../ConfirmFoot/ConfirmFoot";

class Confirm extends Component{
    render(){
        return (
            <div className="confirm">
                <ConfirmHead />
                <ConfirmReel />
                <ConfirmFoot />
            </div>
        );
    }
}

export default Confirm;