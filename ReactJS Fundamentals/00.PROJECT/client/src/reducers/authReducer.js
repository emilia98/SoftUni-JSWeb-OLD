import {FETCH_USER} from '../actions/types';

export default function (state = null, action) {
  // console.log(state);
  // state = state || null; --> if state === false => returns null (NOT CORRECT)
  switch (action.type) {
    case FETCH_USER: {
      return action.payload || false;
    }
    default: {
      return state;
    }
  }
}
