import { GET_COUNTRIES } from "../actions";

const initialState = {
  countries: [],
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
    default: return { ...state }
  }
}

export default rootReducer;