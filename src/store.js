import Reducers from "./Redux/Reducer";
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore  } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)))

export default store;