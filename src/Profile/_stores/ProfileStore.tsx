import * as Immutable from 'immutable';

import { IToast } from './UIToastStore';

export interface IUIDataStore {
    toast: Immutable.OrderedMap<string, IToast>
}

const defaultStore = Immutable.Record<IUIDataStore>({
    toast: Immutable.OrderedMap<string, IToast>()
});

export default class UIDataStore extends defaultStore implements IUIDataStore {}