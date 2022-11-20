import axios from "axios";

import { GET_COUNTRIES, ORDER_BY_NAME, GET_COUNTRIE_BY_NAME, POST_ACTIVITY, ORDER_BY_POPULATION, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRY_DETAIL, FILTER_BY_ACTIVITY, RESET_DETAIL, LOADING } from "../actionTypes";

export const loading = () => {
  return {
    type: LOADING
  }
}

export const getCountries = () => dispatch => {
  try {
    return fetch('http://localhost:3001/countries')
      .then(r => r.json())
      .then(resul => { dispatch({ type: GET_COUNTRIES, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
};

export const getCountrieByName = (name) => dispatch => {
  try {
    return fetch(`http://localhost:3001/countries?name=${name}`)
      .then(r => r.json())
      .then(resul => { dispatch({ type: GET_COUNTRIE_BY_NAME, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload
  }
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload
  }
};

export const filterByContinent = (continent) => dispatch => {
  try {
    return fetch(`http://localhost:3001/countries/continent/${continent}`)
      .then(r => r.json())
      .then(resul => { dispatch({ type: FILTER_BY_CONTINENT, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
};

export const filterByActivity = (payload) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload
  };
};

export const getActivities = () => dispatch => {
  try {
    return fetch('http://localhost:3001/activities')
      .then(r => r.json())
      .then(resul => { dispatch({ type: GET_ACTIVITIES, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
};

export const postActivity = (payload) => {
  return async function (dispatch) {
    const res = await axios.post('http://localhost:3001/activities', payload);
    return dispatch({ type: POST_ACTIVITY, payload: res.data })
  }
};

export const getCountryDetail = (id) => dispatch => {
  try {
    dispatch(loading())
    return fetch(`http://localhost:3001/countries/${id}`)
      .then(r => r.json())
      .then(resul => { dispatch({ type: GET_COUNTRY_DETAIL, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
};

export const resetDetail = function () {
  return {
    type: RESET_DETAIL,
  };
};

/* export const postActivity = (payload) => dispatch => {
  try {
    return fetch('http://localhost:3001/activities', { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ payload: 'Textual content' }) })
      .then(r => r.json())
      .then(resul => { dispatch({ type: POST_ACTIVITY, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
}; */


