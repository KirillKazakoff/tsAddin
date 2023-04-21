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

        // if (status.statusType === 'ok') return;
        // throw new Error(status.statusType);
    }

    resetPageStatus() {
        this.status = initPageStatus();
    }
}

const pageStatusStore = new PageStatusStore();
export default pageStatusStore;
