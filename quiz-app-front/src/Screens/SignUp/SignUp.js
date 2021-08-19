import React, { Component } from "react";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };

    this.signUpNow = this.signUpNow.bind(this);
  }

  signUpNow() {

    const { name } = this.state;

    if (!name.match(/\S+/)) {
      alert("please enter correct name");
    }
    else {
      let userObj = { name };
      sessionStorage.setItem("user", JSON.stringify(userObj));
      this.props.changeUserState();
      
    }

  }

  render() {
    return (
      <div>
        <h1 className="text-center ">REGISTRATION</h1>
        <br />
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
              autoFocus={true}
              className="form-control"
              placeholder="name"
            />
          </div>
          
          <div className="row">
            <div className="col">
              <button className="btn btn-primary" onClick={this.signUpNow}>
                Submit <i className="fa fa-database" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
