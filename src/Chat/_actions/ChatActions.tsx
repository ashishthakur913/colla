import { CreateAjaxAction, FetchResponse } from '../../Common/_middlewares/AjaxMiddleware'
import {Dispatch} from "redux";
import {ShowToast, ToastActionType} from '../../UIData/_actions/ToastActions';
import {_getRequestHeaders} from '../../Common/_util/Request'

export enum ChatActionsType {
    saveUserFriends = 'SAVE_USER_FRIENDS',
}

export function setUserFriendsAction(friends: object) {
    return {
        type: ChatActionsType.saveUserFriends,
        friends: friends
    }
}

export const getUserFriends = () => CreateAjaxAction(
    {
        method: 'GET',
        url: 'api/user/all',
        headers: _getRequestHeaders(),
        onSuccess: (response: FetchResponse, dispatch: Function) => {
            console.log(response, "-----response");
            // dispatch(setAuthAction(response.user.username, response.user.chatToken, true))
        },
        onFailure: (response: FetchResponse, dispatch: Function) => {
            console.log(response, "---response");
        }
    });