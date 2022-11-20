import { GET_COUNTRIES, ORDER_BY_NAME, GET_COUNTRIE_BY_NAME, POST_ACTIVITY, ORDER_BY_POPULATION, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRY_DETAIL, FILTER_BY_ACTIVITY, RESET_DETAIL, LOADING } from "../actionTypes";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  countryDetail: [],
  loading: false
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_COUNTRIE_BY_NAME:
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
        })
        : state.countries.sort(function (a, b) { //desc 
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
    case ORDER_BY_POPULATION:
      let orderByPopulation = action.payload === 'Higher' ?
        state.countries.sort(function (a, b) {
          if (a.poblacion > b.poblacion) {
            return -1;
          }
          if (b.poblacion > a.poblacion) {
            return 1;
          }
          return 0;
        })
        : state.countries.sort(function (a, b) { //desc
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
    case FILTER_BY_CONTINENT:
      return {
        ...state,
        countries: action.payload
      }
    case FILTER_BY_ACTIVITY:
      let allCountries = [...state.allCountries];
      let filter = action.payload === "All" ? allCountries.filter(c => c.activities.length !== 0)
        : allCountries.filter(c => c.activities.map(a => a.nombre).includes(action.payload))
      return {
        ...state,
        countries: filter
      }
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      }
    case POST_ACTIVITY:
      return {
        ...state
      }
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        loading: false,
        countryDetail: action.payload
      }
    case RESET_DETAIL:
      return {
        ...state,
        countryDetail: [],
      };
    default: return { ...state }
  }
}

export default rootReducer;