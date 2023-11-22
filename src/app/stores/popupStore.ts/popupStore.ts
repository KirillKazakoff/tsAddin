import { makeAutoObservable } from 'mobx';

class PopupStore {
    status = {
        title: 'Hello',
        desc: 'I m there',
    };

    isActive = false;

    setStatus(status: typeof this.status) {
        this.status = status;
        this.setActive(true);
    }

    setActive(isActive: boolean) {
        this.isActive = isActive;
    }

    constructor() {
        makeAutoObservable(this);
    }
}

const popupStore = new PopupStore();
export default popupStore;
