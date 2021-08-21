const initState = {
    name: "",
    questions:[{
        question: "",
        answers:[""],
        answer: ""
    }],
    correct: 0,
    count:0,
    score:0,
    isLoading: false
}

const reducer = (state = initState, action) => {
    
    if(action.type == 'SAVE_NAME')
        return {
            name:action.name,
            questions:state.questions,
            correct:state.correct,
            count:state.count,
            score:state.score,
            isLoading:state.isLoading
        }
    else if(action.type == 'RESET')
        return {
            name:state.name,
            questions:state.questions,
            correct:0,
            count:0,
            score:0,
            isLoading:false
        }
    else if(action.type == 'INCREASE')
        return {
            name:state.name,
            questions:state.questions,
            correct:state.correct,
            count:state.count + 1,
            score:state.score,
            isLoading:state.isLoading
        }
    else if(action.type == 'CORRECT')
        return {
            name:state.name,
            questions:state.questions,
            correct:state.correct + 1,
            count:state.count,
            score:state.score,
            isLoading:state.isLoading
        }
        
    else if(action.type == 'SAVE_QUESTIONS')
        return {
            name:state.name,
            questions:action.questions,
            correct:state.correct,
            count:state.count,
            score:state.score,
            isLoading:true
        }
    else if(action.type == 'SCORE')
        return {
            name: state.name,
            questions: state.questions,
            correct: state.correct,
            count: state.count + 1,
            score: (state.correct * (100 / state.questions.length).toFixed(2)),
            isLoading:state.isLoading
        }

    return state;
}

export default reducer