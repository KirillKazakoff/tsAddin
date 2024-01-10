import { makeAutoObservable } from 'mobx';

export type PopupStatus = {
    title: string;
    desc: string;
    immediate?: boolean;
};

const initStatus = (): PopupStatus => ({
    title: '',
    desc: '',
    immediate: false,
});

class PopupStore {
    status = initStatus();

    isActive = false;

    setStatus(status: PopupStatus) {
        if (this.status.immediate && !status.immediate) {
            return;
        }

        this.status = status;

        this.setActive(true);
    }

    setActive(isActive: boolean) {
        this.isActive = isActive;
        if (isActive === false) {
            this.status.immediate = false;
        }
    }

    constructor() {
        makeAutoObservable(this);
    }
}

const popupStore = new PopupStore();
export default popupStore;
