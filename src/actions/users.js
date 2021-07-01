export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ANSWER = 'USER_ANSWER'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION '


export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function userAnswer(authedUser, qid, answer) {
  return {
    type: USER_ANSWER ,
    authedUser,
    qid,
    answer
  };
}

export function userAddQuestion({ id, author }) {
  return {
    type: USER_ADD_QUESTION,
    id,
    author
  };
}