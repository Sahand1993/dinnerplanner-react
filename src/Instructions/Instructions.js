import React, {Component} from "react";
import "./Instructions.css"

class Instructions extends Component{
    constructor(props){
        super(props);
        this.state = {
            instructions:props.instructions,
        }
    }
    render (){
        return (
            <div className="preparation">
                <div className="instructions">
                    <h3>Instructions</h3>
                    <p>{this.state.instructions}</p>
                </div>
            </div>
        );
    }
}
export default Instructions;