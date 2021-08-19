

const  Question = require("./question.model");


exports.getQuestions =  async (req,res,next)=>{

    let questions = await Question.fetchAll(); 

    questions.forEach(question => Question.shuffleAnswers(question));

    res.status(200).json(questions);

};