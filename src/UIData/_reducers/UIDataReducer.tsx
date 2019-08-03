import {AnyAction, combineReducers} from 'redux-immutable';
import UIDataStore from '../_stores/UIDataStore';
import UIToastReducer from './UIToastReducer';

const UIDataReducer = (store:UIDataStore = new UIDataStore(), action:AnyAction):UIDataStore => {
    return combineReducers({
        toast: UIToastReducer
    })(store, action) as UIDataStore;
}

export default UIDataReducer