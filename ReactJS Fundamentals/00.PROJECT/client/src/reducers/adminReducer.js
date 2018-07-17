import { ADMINISTRATE } from '../actions/types';

export default function (state = null, action) {
  // state = state || null; --> if state === false => returns null (NOT CORRECT)
  switch (action.type) {
    case ADMINISTRATE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
