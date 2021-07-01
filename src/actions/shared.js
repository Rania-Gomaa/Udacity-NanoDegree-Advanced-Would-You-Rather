import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { receiveQuestions, answerQuestion, newQuestion } from '../actions/questions';
import { receiveUsers, userAnswer, userAddQuestion } from '../actions/users';

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
    });
  };
}

export function handleUserAnswer ( authedUser, qid, answer) {
  return (dispatch) => {
    //const { authedUser } = getState();
    return saveQuestionAnswer(
      authedUser,
      qid,
      answer
    )
      .then(() => {
        dispatch(answerQuestion(authedUser, qid, answer));
        dispatch(userAnswer(authedUser, qid, answer));
      })
  }
}

export function handleSaveQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    })
      .then((question) => {
        dispatch(newQuestion(question));
        dispatch(userAddQuestion(question));
        
      })
      
  }
}
