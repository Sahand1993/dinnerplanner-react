import React, {Component} from "react";
import "./Print.css";
import ConfirmHead from "../ConfirmHead/ConfirmHead";
import PrintDishes from "../PrintDishes/PrintDishes";

class Print extends Component{
    render(){
        return(
            <div className="print">
                <ConfirmHead />
                <PrintDishes />
            </div>
        );
    }
}

export default Print;