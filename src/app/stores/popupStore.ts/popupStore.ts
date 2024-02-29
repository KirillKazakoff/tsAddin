import { makeAutoObservable } from 'mobx';

export type PopupStatus = {
    title: string;
    desc: string;
};

class PopupStore {
    statuses: PopupStatus[] = [];

    isActive = false;

    // eslint-disable-next-line class-methods-use-this
    pushStatus(status: PopupStatus) {
        console.log();
        // if (this.statuses.some((s) => s.desc === status.desc)) return;
        // this.setActive(true);
        // this.statuses.push(status);
    }

    killStatus() {
        this.statuses.shift();
    }

    killAll() {
        this.statuses = [];
        // this.setActive(false);
    }

    // setActive(status: boolean) {
    // this.isActive = status;
    // }

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
