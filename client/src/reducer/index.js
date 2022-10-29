import { GET_COUNTRIES, ORDER_BY_NAME, GET_COUNTRIE_BY_NAME } from "../actionTypes";

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
    case ORDER_BY_NAME:
      let orderCountries = action.payload === 'AZ' ? //asc
        state.countries.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (b.nombre > a.nombre) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function (a, b) { //desc
          if (a.nombre > b.nombre) {
            return -1;
          }
          if (b.nombre > a.nombre) {
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        countries: orderCountries
      }
    case GET_COUNTRIE_BY_NAME:
      return {
        ...state,
        countries: action.payload
      }
    default: return { ...state }
  }
}

export default rootReducer;