/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import tablesStore from '../tablesStore/tablesStore';
import { selectSp } from '../spsStore/select';

class ExportContractStore {
    fields = {
        podpisant: initPodpisant(),
        dischargeDate: '',
    };

    operation: OperationT = 'export';

    constructor() {
        makeAutoObservable(this);
    }

    setField = {
        podpisant: (value: string) => (this.fields.podpisant = selectSp.podpisant(value)),
        operation: (value: OperationT) => (this.operation = value),
        dischargeDate: (value: string) => (this.fields.dischargeDate = value),
    };

    getCurrentTable() {
        return this.operation === 'export'
            ? tablesStore.exportT
            : tablesStore.exportStorageT;
    }

    get exportRecord() {
        return tablesStore.exportT[0];
    }
    get terms() {
        return this.exportRecord?.terms;
    }
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
