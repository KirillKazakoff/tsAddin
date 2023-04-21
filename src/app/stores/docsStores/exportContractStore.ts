import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import { selectPodpisantSp } from '../spsStore/select';
import tablesStore from '../tablesStore/tablesStore';

class ExportContractStore {
    podpisant = initPodpisant();
    operation: OperationT = 'export_storage';

    constructor() {
        makeAutoObservable(this);
    }

    setPodpisant(podpisant: string) {
        this.podpisant = selectPodpisantSp(podpisant);
    }
    setOperation(operation: OperationT) {
        this.operation = operation;
    }
    getCurrentTable() {
        return this.operation === 'export'
            ? tablesStore.exportT
            : tablesStore.exportStorageT;
    }
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
