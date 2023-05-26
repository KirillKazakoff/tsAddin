/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import tablesStore from '../tablesStore/tablesStore';
import { selectSp } from '../spsStore/select';

class ExportContractStore {
    podpisant = initPodpisant();
    operation: OperationT = 'export';
    dischargeDate = '';

    constructor() {
        makeAutoObservable(this);
    }

    setField = {
        podpisant: (value: string) => (this.podpisant = selectSp.podpisant(value)),
        operation: (value: OperationT) => (this.operation = value),
        dischargeDate: (value: string) => (this.dischargeDate = value),
    };

    getCurrentTable() {
        return this.operation === 'export'
            ? tablesStore.exportT
            : tablesStore.exportStorageT;
    }
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
