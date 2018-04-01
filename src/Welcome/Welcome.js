import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div className="row indexbody">
          <div className="col-lg-7 col-md-7 col-sm-7 col-xs-10 col-centered">
            <p className="bodytext">
                Welcome to the dinner planner app! Click the button below to start planning your dinner!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="buttonwrapper">
            <Link to="/search">
                <button type="button" className="btn btn-default">Start planning</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
