import * as Immutable from "immutable";

export interface IAuth {
    userName: string,
    isLoggedIn: boolean,
    chatToken: string
}

export interface IAuthStore {
    Auth: Immutable.OrderedMap<string, IAuth>
}

const defaultStore = Immutable.Record<IAuthStore>({
    Auth: Immutable.OrderedMap<string, IAuth>()
});

export default class AuthStore extends defaultStore implements IAuthStore {}

