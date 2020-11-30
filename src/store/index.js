import {createStore} from 'redux'

const initialState = {
  board: []
}

function reducer (state=initialState, action) {
  switch (action.type) {
    case 'FETCH_BOARD':
      const fetchBoard = state.board.push(action.payload.data)
      return {...state, board: fetchBoard}
    default:
      return state
  }
}

const store = createStore(reducer)

export default store