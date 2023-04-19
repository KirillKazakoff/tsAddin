import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import { selectPodpisantSp } from '../spsStore/select';

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
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
