import {AsyncStorage} from "react-native";
import {_retrieveUserToken} from "./AsyncStorage"
import ReduxStore from '../../Store';

export const _getRequestHeaders = () => {
    const state = ReduxStore.getState();
    let userToken = state.getIn(['Auth', 'authToken']);
    return new Headers({
        'Authorization': 'Token ' + userToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })
}