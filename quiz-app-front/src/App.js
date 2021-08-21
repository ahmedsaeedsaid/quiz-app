import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import SignUp from "./Screens/SignUp/SignUp";
import MCQs from "./Screens/MCQs/MCQs";

class App extends Component {
  constructor() {
    super();    
  }

  

  render() {
    return (
      <div className="container margin">
        {this.props.name ==="" ? (
          <div>
            <SignUp/>            
          </div>
        ) : (
          <div>
            <br />
            <MCQs/>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      name : state.name
    }
}

export default connect(mapStateToProps)(App);
