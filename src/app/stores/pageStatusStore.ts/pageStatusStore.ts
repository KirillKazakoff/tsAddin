import { makeAutoObservable } from 'mobx';
import { PageStatusT, initPageStatus } from './pageMessages';

class PageStatusStore {
    status = initPageStatus();
    isValidation = true;

    constructor() {
        makeAutoObservable(this);
    }

    setPageStatus(status: PageStatusT) {
        this.status = status;
    }

    resetPageStatus() {
        this.status = initPageStatus();
    }

    setIsValidation(value: boolean) {
        this.isValidation = value;
    }
}

const pageStatusStore = new PageStatusStore();
export default pageStatusStore;
