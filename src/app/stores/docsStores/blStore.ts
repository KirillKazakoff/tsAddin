import { makeAutoObservable } from 'mobx';

class BlStore {
    name = 'blStore';
    isSortable = false;

    constructor() {
        makeAutoObservable(this);
    }

    setSortable(value: boolean) {
        this.isSortable = value;
    }
}

const blStore = new BlStore();
export default blStore;
