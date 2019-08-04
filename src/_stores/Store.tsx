import * as Immutable from 'immutable';
import UIDataStore from '../UIData/_stores/UIDataStore';
import AuthStore from '../Auth/_stores/AuthStore';

export interface IStore {
    UIData: UIDataStore,
    Auth: AuthStore,
}

const defaultStore = Immutable.Record<IStore>({
    UIData: new UIDataStore(),
    Auth: new AuthStore()
});

export default class Store extends defaultStore implements IStore {}