const mongodb = require('mongodb');
const getDb = require('../../util/database').getDb;

class Question{

    static sampleSize = 5 ;

    /**
    * retrieve all questions.
    * @return {Array}           question objects.
    */
    static  fetchAll (){
        const db = getDb();
        return db.collection('questions')
        .aggregate([{ $sample: { size: this.sampleSize } }])
        .toArray()
        .then(questions => {
            return questions;
        }).catch( _ =>{
            return [];
        });
    }

    /**
    * shuffle answers and keep right answer.
    * @param  {Object}  question          Question.
    * @return {Object}                    Question after updated.
    */
    static shuffleAnswers(question) {

        var randomIndex, currentIndex;

        // While there remain elements to shuffle...
        for (currentIndex = question.answers.length - 1; currentIndex > 0; currentIndex--) {
            randomIndex = Math.floor(Math.random() * (currentIndex + 1));

            // And swap it with the current element.
            [question.answers[currentIndex], question.answers[randomIndex]] = 
            [question.answers[randomIndex], question.answers[currentIndex]];
            
            // keep index of Right Answer.
            question.answer = (
                question.answer == currentIndex? randomIndex :
                 (question.answer == randomIndex? currentIndex : question.answer)
            ).toString();

        }
      }

    
}

module.exports = Question;