import React, {Component} from "react";
import "./Hamburger.css";
class Hamburger extends Component{
    render (){
        return (
            <div className="hamburgerdiv">
                <button className="hamburger" onClick={()=>this.props.onClick()}>
                <i className="fas fa-bars"></i>
                </button>
            </div>
        )
    }
}
export default Hamburger;