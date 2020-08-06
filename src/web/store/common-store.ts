import { PersistentStore, Store } from '../types/store';
import { COMMON_STORE_NAME } from '../types/constants';
import { menuList as _menuList} from '@/utils/constant';

interface ICommon {
    currentIndex?: number;
    menuList?: {[key: string]: string | number}[];
}

class CommonStore extends PersistentStore<ICommon> {
    protected data(): ICommon {
        return {
            currentIndex: 0,
            menuList: _menuList,
        };
    }

    setMenuIndex(index: number) {
        this.state.currentIndex = index;
    }
    setMenuList(menuList: {[key: string]: string | number}[]) {
        this.state.menuList = menuList;
    }
}

export const commonStore = new CommonStore(COMMON_STORE_NAME);