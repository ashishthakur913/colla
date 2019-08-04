import { combineReducers } from 'redux-immutable'
import UIDataReducer from '../UIData/_reducers/UIDataReducer';
import AuthReducer from '../Auth/_reducers/AuthReducer';

export default combineReducers({
    UIData: UIDataReducer,
    Auth: AuthReducer,
})