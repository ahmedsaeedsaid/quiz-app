import React, { Component } from "react";
import { connect } from "react-redux";
import Result from "./Result";

class MCQs extends Component {

  fetchQuestions() {
    fetch('http://localhost:8084/getQuestions')
    .then(response=>response.json())
    .then(questions=> {
        this.props.saveQuestions(questions)
      });
  }

  componentDidMount() {
    this.fetchQuestions()
  }


  next = () => {

    var radioBtn = document.querySelector("input[name='option']:checked");

    if (radioBtn == null) {
      alert("please select answer.");
    } else {

      if (this.props.questions[this.props.count].answer.match(radioBtn.value)) 
        this.props.increaseCorrect();

      if (this.props.questions.length - 1 == this.props.count)
        this.props.CalScore();

      else
        this.props.increase();
    }
  }


  

  render() {
    // reload questions when user need reExam
    if(!this.props.isLoading)
      this.fetchQuestions()

    
    // check exam is End or not
    const isEnd = this.props.questions.length  != this.props.count;


    const options = []
    if(isEnd){
      for (const [index, answer] of this.props.questions[this.props.count].answers.entries()) {
        options.push(<label className="btn btn-lg btn-info btn-block" key={index}>
                        <span className="btn-label">
                            <input type="radio" name="option" value={index} />
                            <br />
                            <i className="fa fa-arrow-right" />
                        </span>
                        <span>{answer}</span>
                    </label>);
      }
    }
    

    
    
    
    return (
      <div>
        <div className="col-md-12">
          <div className="col" id="content">
          {isEnd ? (
            <div id="quizContainer">
              <div className="modal-header">
                <h5>
                  <i className="fa fa-question-circle" />
                  <span> </span>
                  <span className="label label-warning">{this.props.questions[this.props.count].question}</span>
                </h5>
              </div>
              <div className="modal-body">
                <div className="quiz" id="quiz" data-toggle="buttons">

                  {options}

                  <button
                    className="btn btn-success pull-right"
                    onClick={this.next}
                  >
                    Next Question <i className="fa fa-angle-double-right" />
                  </button>

                  <br />
                  <br />
                </div>
              </div>
            </div>

          ) : (
              <Result/>
          )}

            
            
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

    name : state.name,
    questions : state.questions,
    correct : state.correct,
    count : state.count,
    score : state.score,
    isLoading:state.isLoading


  }
}

function mapDispatchToProps(dispatch){
  return {
    increase : () => {dispatch({type:'INCREASE'})} ,
    increaseCorrect : () => {dispatch({type:'CORRECT'})} ,
    CalScore : () => {dispatch({type:'SCORE'})} ,
    saveQuestions : (questions) => {dispatch({type:'SAVE_QUESTIONS',questions:questions})} 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MCQs);
