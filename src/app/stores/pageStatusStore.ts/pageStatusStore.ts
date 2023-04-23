import { makeAutoObservable } from 'mobx';
import { initPageStatus } from './initPageStatus';
import { PageStatusT } from './pageMessages';

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
