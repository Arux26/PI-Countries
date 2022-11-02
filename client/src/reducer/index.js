import { GET_COUNTRIES, ORDER_BY_NAME, GET_COUNTRIE_BY_NAME, POST_ACTIVITY, ORDER_BY_POPULATION, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRY_DETAIL } from "../actionTypes";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  countryDetail: []
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload
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
    case FILTER_BY_CONTINENT:
      return {
        ...state,
        countries: action.payload
      }
    case ORDER_BY_POPULATION:
      let orderByPopulation = action.payload === 'Mayor' ?
        state.countries.sort(function (a, b) {
          if (a.poblacion > b.poblacion) {
            return -1;
          }
          if (b.poblacion > a.poblacion) {
            return 1;
          }
          return 0;
        }) :
        state.countries.sort(function (a, b) { //desc
          if (a.poblacion > b.poblacion) {
            return 1;
          }
          if (b.poblacion > a.poblacion) {
            return -1;
          }
          return 0;
        })
      return {
        ...state,
        countries: orderByPopulation
      }
    case POST_ACTIVITY:
      return {
        ...state
      }
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      }
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload
      }
    default: return { ...state }
  }
}

export default rootReducer;