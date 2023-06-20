/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import tablesStore from '../tablesStore/tablesStore';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    podpisant: initPodpisant(),
    dischargeDate: '',
    declaration: '',
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class ExportContractStore {
    fields = initFields();
    operation: OperationT = 'export';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.dischargeDate = values.dischargeDate;
        this.fields.declaration = values.declaration;
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
