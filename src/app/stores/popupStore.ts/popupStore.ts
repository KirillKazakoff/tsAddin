import { makeAutoObservable } from 'mobx';

export type PopupStatus = {
    title: string;
    desc: string;
};

class PopupStore {
    statuses: PopupStatus[] = [];

    currentIndex = 0;

    isActive = false;

    pushStatus(status: PopupStatus) {
        if (this.statuses.some((s) => s.desc === status.desc)) return;
        this.statuses.push(status);
    }

    setActive(status: boolean) {
        this.isActive = status;
    }

    operateIndex(operation: 'increase' | 'decrease') {
        const isLast = this.currentIndex === this.statuses.length - 1;
        const isFirst = this.currentIndex === 0;

        if (operation === 'increase' && !isLast) {
            this.currentIndex += 1;
        } else if (operation === 'decrease' && !isFirst) {
            this.currentIndex -= 1;
        }
    }

    reset() {
        this.statuses = [];
    }

    get currentStatus() {
        if (this.statuses.length === 0) return null;
        return this.statuses[this.currentIndex];
    }

    constructor() {
        makeAutoObservable(this);
    }
}

const popupStore = new PopupStore();
export default popupStore;
