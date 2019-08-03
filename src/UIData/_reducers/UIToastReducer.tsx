import * as Immutable from 'immutable';
import { IToast, defaultToastStore } from '../_stores/UIToastStore';
import { ToastAction, ToastActionType } from '../_actions/ToastActions';

const UIToastReducer = (store:Immutable.OrderedMap<string, IToast> = Immutable.OrderedMap<string, IToast>(), action: ToastAction):Immutable.OrderedMap<string, IToast> => {
    switch (action.type) {
        case ToastActionType.ShowToast:
            return store.withMutations(store => {
                store.setIn(['toastOpen'], action.toastOpen)
                store.setIn(['toastMessage'], action.toastMessage)
            });
            break;
    }
    return store;
}

export default UIToastReducer