import { actionTypes as types } from '../constants'

const INITIAL_STATE = {
  token: [],
  class: 0,
  accuracy: 0,
}
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return action.data
    case 'SET_CLASS':
      console.log('diooo')
      console.log(action.payload)
      return {
        ...state,

        class: action.payload.Class,
        accuracy: action.payload.Accuracy.toFixed(2)
      }
    default:
      return state
  }
}

export default user
