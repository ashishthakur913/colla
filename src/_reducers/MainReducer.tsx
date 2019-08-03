import { combineReducers } from 'redux-immutable'
import UIDataReducer from '../UIData/_reducers/UIDataReducer';

export default combineReducers({
    UIData: UIDataReducer
})