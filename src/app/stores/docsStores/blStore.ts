import { makeAutoObservable } from 'mobx';

class BlStore {
    name = 'blStore';
    isSortable = false;
    catchZone = 'OKHOTSK SEA';

    constructor() {
        makeAutoObservable(this);
    }

    setSortable(value: boolean) {
        this.isSortable = value;
    }

    setCatchZone() {
        return (value: string) => {
            this.catchZone = value.toUpperCase();
        };
    }
}

const blStore = new BlStore();
export default blStore;
