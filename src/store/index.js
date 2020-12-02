import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [],
  user: '',
  difficulty: 'easy',
  status: ''
}

export function fetchBoard(difficulty) {
  return (dispatch) => (
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
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

export function solveBoard() {
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(({solution, status}) => {
        console.log(solution, '<<<< isi solve board')
        dispatch({
          type: 'SOLVE_BOARD',
          payload: {
            solution,
            status
          }
        })
      })
      .catch(err => console.log(err))
  }
}

export function validateBoard(board) {
  function encodeBoard(board) {
    return board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  }

  function encodeParams(params) {
    return Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
  }

  console.log(board, '<<< data sebelum validate')
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({
        board
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, '<<< hasil validate')
        dispatch({
          type: 'SET_STATUS',
          payload: {
            data
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
      return {...state, board, status: ''}
    case 'SOLVE_BOARD': {
      return {...state, board: action.payload.solution, status: action.payload.status}
    }
    case 'SET_BOARD': {
      const newBoard = action.payload.newBoard
      console.log(newBoard, '<<< newBoard di SETBOARD')
      return {...state, board: newBoard}
    }
    case 'SET_STATUS': {
      return {...state, status: action.payload.data.status}
    }
    case 'SET_NAME':
      return {...state, user: action.payload.inputName}
    case 'SET_DIFFICULTY':
      return {...state, difficulty: action.payload.value}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store