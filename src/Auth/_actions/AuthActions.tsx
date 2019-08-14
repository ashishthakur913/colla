import { CreateAjaxAction, FetchResponse } from '../../Common/_middlewares/AjaxMiddleware'
import {Dispatch} from "redux";
import { _storeData } from '../../Common/_util/AsyncStorage'
import {ShowToast, ToastActionType} from '../../UIData/_actions/ToastActions'

interface loginCredentials {
    user: {
        email: String,
        password: String
    }
}

export enum AuthActionsType {
    fetchUserToken = 'FETCH_USER_TOKEN',
    setUserAuth = 'SET_USER_AUTH',
}

export function storeUserTokenAction(token: string) {
    return {
        type: AuthActionsType.fetchUserToken,
        token: token
    }
}

export const setAuthAction = (username: string, chatToken: string, authToken: string, loggedIn: boolean) => {
    return {
        type: AuthActionsType.setUserAuth,
        action: {
            username: username,
            isLoggedIn: loggedIn,
            chatToken: chatToken,
            authToken: authToken
        }
    }
};

export const verifyUserToken = (token: string) => CreateAjaxAction(
    {
        method: 'GET',
        url: 'api/user',
        headers: new Headers({
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        onSuccess: (response: FetchResponse, dispatch: Function) => {
            dispatch(setAuthAction(response.user.username, response.user.chatToken, response.user.token, true))
        },
        onFailure: (response: FetchResponse, dispatch: Function) => {
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
        onSuccess: (response: FetchResponse, dispatch: Function) => {
            dispatch(setAuthAction(response.user.username, response.user.chatToken, true))
            _storeData(response.user.token);

        },
        onFailure: (response: FetchResponse, dispatch: Function) => {
            dispatch(ShowToast(true, 'Email/Password does not match. Please try again with correct details.'));
            setTimeout(() => {
                dispatch(ShowToast(false    , ''));
            }, 3000)
        }
    });

export type AuthAction =
    ReturnType<typeof setAuthAction>