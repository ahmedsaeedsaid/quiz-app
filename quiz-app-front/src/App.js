import React, { Component } from "react";
import "./App.css";
import SignUp from "./Screens/SignUp/SignUp";
import MCQs from "./Screens/MCQs/MCQs";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isUser: false
    };
    this.checkUser = this.checkUser.bind(this);
    this.changeUserState = this.changeUserState.bind(this);
    
  }

  checkUser() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      console.log("user is NOT in System");
      this.setState({ isUser: false });
    } else {
      this.setState({ isUser: true });
      console.log(`${user.name} is in System`);
    }
  }

  changeUserState() {
    this.setState({ isUser: true });
  }

  componentDidMount() {
    this.checkUser();
  }

  render() {
    const { isUser } = this.state;
    console.log(JSON.parse(localStorage.getItem("user")));
    return (
      <div className="container margin">
        {!isUser ? (
          <div>
            <SignUp changeUserState={this.changeUserState} />            
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

export default App;
