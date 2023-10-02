import { makeAutoObservable } from 'mobx';
import { PageStatusKeyT, getPageStatus, initPageStatus } from './getPageStatus';

class PageStatusStore {
    status = initPageStatus();
    isValidation = true;

    constructor() {
        makeAutoObservable(this);
    }

    setPageStatus(key: PageStatusKeyT, message?: string) {
        this.status = getPageStatus(key, message);
    }

    resetPageStatus() {
        this.status = getPageStatus('ok');
    }

    setIsValidation(value: boolean) {
        this.isValidation = value;
    }
}

const pageStatusStore = new PageStatusStore();
export default pageStatusStore;
