/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import tablesStore from '../tablesStore/tablesStore';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';
import { PodpisantT } from '../../types/typesSP';

type ContractStoreT = {
    podpisant: PodpisantT;
    dischargeDate: string;
};

class ExportContractStore {
    fields: ContractStoreT = {
        podpisant: initPodpisant(),
        dischargeDate: '',
    };

    operation: OperationT = 'export';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormValuesT<ContractStoreT>) {
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.dischargeDate = values.dischargeDate;
    }

    setOperation(value: OperationT) {
        this.operation = value;
    }

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
