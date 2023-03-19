import { makeAutoObservable } from 'mobx';

export type OperationT = 'export' | 'export_storage';

class BlStore {
    operation: OperationT = 'export';

    constructor() {
        makeAutoObservable(this);
    }

    setOperation(operation: OperationT) {
        this.operation = operation;
    }
}

const blStore = new BlStore();
export default blStore;
