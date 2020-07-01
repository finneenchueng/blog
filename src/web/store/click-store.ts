import { PersistentStore, Store } from '../types/store';
import { CLICK_STORE_NAME } from '../types/constants';

interface Click extends Object {
    count: number
}

class ClickStore extends PersistentStore<Click> {
    protected data(): Click {
        return {
            count: 0,
        };
    }

    incrementCount() {
        this.state.count++;
    }
}

export const clickStore = new ClickStore(CLICK_STORE_NAME);