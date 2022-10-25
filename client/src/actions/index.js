//import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";

export const getCountries = () => dispatch => {
    return fetch('http://localhost:3001/countries')
        .then(r => r.json())
        .then(resul => { dispatch({ type: GET_COUNTRIES, payload: resul }) })
};