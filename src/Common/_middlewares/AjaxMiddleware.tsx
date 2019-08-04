import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from "redux";

const AjaxActionType = 'AJAX_ACTION_TYPE';

export interface FetchResponse {
    [key:string]: any
}

type FetchBody = Object;

interface AjaxActionObj {
    type: string
    action: AjaxAction

}

interface AjaxAction {
    url: string,
    method: 'GET' | 'POST',
    headers?: Headers,
    data?: FetchBody,
    onSuccess: Function,
    onFailure: Function,
}

export function CreateAjaxAction (action: AjaxAction):AjaxActionObj {
    return {
        type: AjaxActionType,
        action: action
    } as AjaxActionObj
}

const AjaxMiddleware: Middleware<Dispatch> = ({dispatch}: MiddlewareAPI) => next => (actionObj) => {
    let {type, action} = actionObj;
    if (type != AjaxActionType) {
        let simpleAction = {
            type: type,
            ...action
        }
        return next(simpleAction);
    }
    let { url, method = "GET", data, onSuccess, onFailure, headers } = action;
    let options = {
        method: method,
        headers: headers ? headers : new Headers()
    };
    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch("http://192.168.2.27/" + url, options)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else throw 'Uncaught Ajax Error';
        })
        .then(response => onSuccess && onSuccess(response as FetchResponse, dispatch))
        .catch(response => onFailure && onFailure(response as FetchResponse, dispatch))
};

export default AjaxMiddleware;
