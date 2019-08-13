import * as Immutable from 'immutable';
import { IAuth } from '../_stores/AuthStore';
import { AuthAction, AuthActionsType } from '../_actions/AuthActions';

const AuthReducer = (store:Immutable.OrderedMap<string, IAuth> = Immutable.OrderedMap<string, IAuth>(), action: AuthAction):Immutable.OrderedMap<string, IAuth> => {
    switch (action.type) {
        case AuthActionsType.setUserAuth:
            return store.withMutations(store => {
                store.setIn(['username'], action.username)
                store.setIn(['isLoggedIn'], action.isLoggedIn)
                store.setIn(['chatToken'], action.chatToken)
            });
            break;
    }
    return store;
}

export default AuthReducer