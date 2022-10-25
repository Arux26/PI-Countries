import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk), //esta funcion es para poder hacer peticiones de acciones asincronas, funciona de intermediario entre la api y nuetra aplicacion
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;