import * as Immutable from 'immutable';
import UIDataStore from '../UIData/_stores/UIDataStore';

export interface IStore {
    UIData: UIDataStore
}

const defaultStore = Immutable.Record<IStore>({
    UIData: new UIDataStore()
});

export default class Store extends defaultStore implements IStore {}