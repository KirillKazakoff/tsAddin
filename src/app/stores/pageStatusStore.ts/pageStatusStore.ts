import { makeAutoObservable } from 'mobx';
import { PageStatusT, initPageStatus } from './pageMessages';

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
