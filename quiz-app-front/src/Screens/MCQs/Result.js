import React, { Component } from "react";
import { connect } from "react-redux";

class Result extends Component {
  constructor() {
    super();
  }


  

  render() {
    return (
        <div id="resultContainer" >
            <div className="modal-header">

            <h2> name {this.props.name}</h2>
            <button
                className="btn btn-secondary pull-right"
                onClick={() => {
                    this.props.reset()
                }}
                >
                Re Exam <i className="fa fa-undo" />
            </button>
            </div>
            <div className="modal-body">
                
                <p>Questions: {this.props.questions.length}</p>
                {this.props.score < 70 ? (
                <h3>You are fail with grades {this.props.score}%</h3>
                ) : (
                <h3>You are pass with grades {this.props.score}%</h3>
                )}
                
            </div>
        </div>
    
    );
  }


}
function mapStateToProps(state) {
    return {
      score : state.score,
      questions : state.questions,
      name : state.name
    }
}

function mapDispatchToProps(dispatch){
    return {
        reset : () => {dispatch({type:'RESET'})}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Result);
