import {applyMiddleware, compose, createStore} from "redux";
import AjaxMiddleware from "./Common/_middlewares/AjaxMiddleware";
import thunk from "redux-thunk";
import MainReducer from "./_reducers/MainReducer";

const middleware = applyMiddleware(AjaxMiddleware, thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ReduxStore = createStore(
    MainReducer,
    composeEnhancers(middleware)
);