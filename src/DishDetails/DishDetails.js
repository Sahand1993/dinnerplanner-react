import React, {Component} from "react";
import "./DishDetails.css";
import {Link} from "react-router-dom";
import {modelInstance} from "../data/DinnerModel";
import IngredientsList from "../IngredientsList/IngredientsList";
import Instructions from "../Instructions/Instructions";
import Sidebar from "../Sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";

class DishDetails extends Component {
    constructor(props) {
        super(props);
//        const dish = props.model.getDish(1);
        // do api call

        this.state = {
            id: props.match.params.id,
            status: "INITIAL",
            type: props.match.params.type,
            hideSidebar:true,
            width: 0,
            height: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    addToMenu (type){
        modelInstance.addToMenu(this.state.id, type);
        this.props.history.push("/search");
    }

    componentDidMount = () => {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        modelInstance.getDish(this.state.id)
        .then(dish=> {
            this.setState({
                status:"LOADED",
                ingredients: dish.extendedIngredients,
                dishText: dish.winePairing.pairingText,
                pricePerServing: dish.pricePerServing,
                title: dish.title,
                img: dish.image,
                instructions: dish.instructions,
            })
        })
        .catch(()=>{
            this.setState({
                status:"ERROR",
            })
        })
    }
    
    componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    renderSidebar(){
        if(this.state.hideSidebar && this.state.width<767){
          return(null);
        }else{
          return <Sidebar />
        }
    }
    hamburgerClick(){
        this.setState({
        hideSidebar:!this.state.hideSidebar,
        });
    }
    renderScrollable(){
        let className;
        if(this.state.hideSidebar){
            className="hidden-sidebar";
        }
        else if(!this.state.hideSidebar){
            className="shown-sidebar";
        }
        
        return (
            <div className={className}>
                <div className="dishdetails">
                    <h3 id="dishtitle" className="dishtitle">{this.state.title}</h3>
                    <img alt="details-img" id="dishimg" className="dishimg" src={this.state.img}/>
                    <div id="dishtext" className="dishtext col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        {this.state.dishText}
                    </div>
                    <div className="back-to-search">
                        <Link to={{
                            pathname:"/search/"+this.props.query+"/"+this.props.type,
                        }}>
                            <button id="details-backbutton" className="btn btn-default" type="button">Back to Search</button>
                        </Link>
                    </div>
                </div>
                <IngredientsList ingredients={this.state.ingredients} pricePerServing={this.state.pricePerServing} id={this.state.id} onButtonClick={() => this.addToMenu(this.state.type)}/>
                <Instructions instructions={this.state.instructions} />
            </div>
        );
    }
    render() {
        switch(this.state.status){
            case "INITIAL":
                return (
                    <p>Loading...</p>
                );
            case "ERROR":
                return (
                    <p>An error has occurred, please refresh the page</p>
                );
            default:
                break;
        }
        return (
            //Only come here if we get a successful response
            <div id="details" className="DishDetails">
                <Hamburger onClick={() => this.hamburgerClick()}/>
                {this.renderSidebar()}
                {this.renderScrollable()}            
            </div>
        );
    }
}


export default withRouter(DishDetails);