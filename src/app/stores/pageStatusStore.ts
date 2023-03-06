import { makeAutoObservable } from 'mobx';

class PageStatusStore {
    isLetterError = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLetterStatus(status: boolean) {
        this.isLetterError = status;
    }
}

const pageStatusStore = new PageStatusStore();
export default pageStatusStore;
