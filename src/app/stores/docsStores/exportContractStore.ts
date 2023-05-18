/* eslint-disable no-return-assign */
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

    setField = {
        podpisant: (value: string) => (this.podpisant = selectPodpisantSp(value)),
        operation: (value: OperationT) => (this.operation = value),
    };

    getCurrentTable() {
        return this.operation === 'export'
            ? tablesStore.exportT
            : tablesStore.exportStorageT;
    }
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
