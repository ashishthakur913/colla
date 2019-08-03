import { CreateAjaxAction, FetchResponse } from '../../Common/_middlewares/AjaxMiddleware'
import {Dispatch} from "redux";
import { _storeData } from '../../Common/_util/AsyncStorage'
import { ShowToast } from '../../UIData/_actions/ToastActions'

interface loginCredentials {
    user: {
        email: String,
        password: String
    }
}

export enum LoginActions {
    fetchUserToken = 'FETCH_USER_TOKEN',
    verifyUserToken = 'FETCH_USER_TOKEN',
}

export function storeUserTokenAction(token: string) {
    return {
        type: LoginActions.fetchUserToken,
        token: token
    }
}

export const verifyUserToken = (token: string) => CreateAjaxAction(
    {
        method: 'GET',
        url: 'api/user',
        headers: new Headers({
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        onSuccess: (response: FetchResponse, dispatch) => {
            console.log(response, "---response yay");
        },
        onFailure: (response: FetchResponse, dispatch) => {
            console.log(response, "---response");
        }
    });

export const login = (data: loginCredentials) => CreateAjaxAction(
    {
        method: 'POST',
        url: 'api/users/login',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        data: data,
        onSuccess: (response: FetchResponse, dispatch) => {
            console.log(response.user, "===USER");
            // _storeData(response.user.token);

        },
        onFailure: (response: FetchResponse, dispatch) => {
            dispatch(ShowToast(true, 'Email/Password does not match. Please try again with correct details.'));
            setTimeout(() => {
                dispatch(ShowToast(false    , ''));
            }, 3000)
        }
    });