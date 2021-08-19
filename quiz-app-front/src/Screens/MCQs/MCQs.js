import React, { Component } from "react";

class MCQs extends Component {
  
  constructor(props) {

    super(props);

    this.state = {
      quiz_questions: [
        {
          question: "",
          answers:[],
          answer: ""
        }
      ],
      i: 0,
      correct: 0,
      score: 0,
    };

    this.next = this.next.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  fetchQuestions(){
    fetch('http://localhost:8084/getQuestions')
    .then(response=>response.json())
    .then(data=> {
      this.setState({quiz_questions : data});
      
      });
  }

  componentDidMount() {
    this.fetchQuestions();
  }
  next() {

    var { i, correct, score , quiz_questions } = this.state;


    var radioBtn = document.querySelector("input[name='option']:checked");
    if (radioBtn == null) {
      alert("select value");
    } else {

      if (quiz_questions[i].answer.match(radioBtn.value)) 
        this.setState({ correct: ++correct });
      
      if (quiz_questions.length - 1 === i) {
        
        document.getElementById("quizContainer").style.display = "none";
        document.getElementById("resultContainer").style.display = "block";
        
        score = correct * (100 / quiz_questions.length).toFixed(2);
        
        this.setState({ score });

      } else {
        this.setState({
          i: ++i
        });
      }
    }
  }


  

  render() {
    const { i, score ,quiz_questions } = this.state;


    const options = []

    for (const [index, answer] of quiz_questions[i].answers.entries()) {
      options.push(<label className="btn btn-lg btn-info btn-block">
                      <span className="btn-label">
                          <input type="radio" name="option" value={index} />
                          <br />
                          <i className="fa fa-arrow-right" />
                      </span>
                      <span>{answer}</span>
                  </label>);
    }

    return (
      <div>
        <div className="col-md-12">
          <div className="col" id="content">
            <div id="quizContainer">
              <div className="modal-header">
                <h5>
                  <i className="fa fa-question-circle" />
                  <span> </span>
                  <span className="label label-warning">{quiz_questions[i].question}</span>
                </h5>
              </div>
              <div className="modal-body">
                <div className="quiz" id="quiz" data-toggle="buttons">

                  {options}

                  <button
                    className="btn btn-success pull-right"
                    onClick={this.next.bind(this)}
                  >
                    Next Question <i className="fa fa-angle-double-right" />
                  </button>

                  <br />
                  <br />
                </div>
              </div>
            </div>
            <div id="resultContainer" style={{ display: "none" }}>
              <div className="modal-header">

              <h2> Quiz</h2>
                  
                </div>
                <div className="modal-body">
                  
                  <p>Questions: {quiz_questions.length}</p>
                  {score < 70 ? (
                    <h3>You are fail with grades {score}%</h3>
                  ) : (
                    <h3>You are pass with grades {score}%</h3>
                  )}
                  <hr />
                  <p className="badge badge-warning text-center">My IDs</p>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MCQs;
