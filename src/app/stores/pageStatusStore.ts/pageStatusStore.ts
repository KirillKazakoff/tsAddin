import { makeAutoObservable } from 'mobx';
import { PageStatusT } from '../../types/typesStore';
import { initPageStatus } from './initPageStatus';

class PageStatusStore {
    status = initPageStatus();

    constructor() {
        makeAutoObservable(this);
    }

    setPageStatus(status: PageStatusT) {
        this.status = status;
    }

    resetPageStatus() {
        this.status = initPageStatus();
    }
}

const pageStatusStore = new PageStatusStore();
export default pageStatusStore;
