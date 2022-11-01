//import axios from "axios";

import { GET_COUNTRIES, ORDER_BY_NAME, GET_COUNTRIE_BY_NAME, POST_ACTIVITY, ORDER_BY_POPULATION, FILTER_BY_CONTINENT } from "../actionTypes";


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
}

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload
  }
}

export const filterByContinent = (continent) => dispatch => {
  try {
    return fetch(`http://localhost:3001/countries/continent/${continent}`)
      .then(r => r.json())
      .then(resul => { dispatch({ type: FILTER_BY_CONTINENT, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
};

export const postActivity = (payload) => dispatch => {
  try {
    return fetch('http://localhost:3001/activities', payload)
      .then(r => r.json())
      .then(resul => { dispatch({ type: POST_ACTIVITY, payload: resul }) })
  } catch (e) {
    console.log(e)
  }
};
