import React, { Component } from "react";
import { connect } from "react-redux";

class SignUp extends Component {
  constructor() {
    super();
  }

  signUp = () => {
    var name = document.querySelector("input[name='name']").value;
    !name.match(/\S+/) ? alert("please enter correct name"):this.props.saveName(name);
  }

  render() {
    return (
      <div>
        <h1 className="text-center ">REGISTRATION</h1>
        <br />
        <div className="row" id="content">
          <div className="col-md-12 ">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              autoFocus={true}
              className="form-control"
              placeholder="name"
            />
          </div>
          
          <div className="col">
          <br/>
          <br/>
            <button className="btn btn-primary" onClick={this.signUp}>
              Submit <i className="fa fa-database" />
            </button>
          </div>
          
          
        </div>        
      </div>
    );
  }


}
function mapStateToProps(state) {
    return {
      name : state.name
    }
}

function mapDispatchToProps(dispatch){
  return {
    saveName : (name) => { dispatch({type:'SAVE_NAME',name:name}) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
