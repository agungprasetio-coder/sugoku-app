import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [],
  user: '',
  status: 'unsolved'
}

export function fetchBoard() {
  return (dispatch) => (
    fetch('https://sugoku.herokuapp.com/board?difficulty=hard')
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'FETCH_BOARD',
          payload: {
            data
          }
        })
      })
      .catch(err => console.log(err))
  )
}

export function validateBoard(data) {
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: {
        data
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => {
        dispatch({
          type: 'SET_STATUS',
          payload: {
            res
          }
        })
      })
      .catch(err => console.log(err))
  }
}

function reducer (state=initialState, action) {
  switch (action.type) {
    case 'FETCH_BOARD':
      const board = action.payload.data.board
      console.log(action.payload.data, '<<< Board Awal di reducer')
      return {...state, board}
    case 'SET_NAME':
      return {...state, user: action.payload.inputName}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store