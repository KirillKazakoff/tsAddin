import { makeAutoObservable } from 'mobx';

export type PopupStatus = {
    title: string;
    desc: string;
};

class PopupStore {
    statuses: PopupStatus[] = [];

    isActive = false;

    pushStatus(status: PopupStatus) {
        if (this.statuses.some((s) => s.desc === status.desc)) return;
        this.statuses.push(status);
    }

    killStatus() {
        this.statuses.shift();
    }

    get currentStatus() {
        if (this.statuses.length === 0) return null;
        return this.statuses[0];
    }

    constructor() {
        makeAutoObservable(this);
    }
}

const popupStore = new PopupStore();
export default popupStore;
