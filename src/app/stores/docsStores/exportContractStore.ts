import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import tablesStore from '../tablesStore/tablesStore';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    podpisant: initPodpisant(),
    departureDate: '',
    declaration: '',
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class ExportContractStore {
    fields = initFields();
    operation: OperationT = 'export';
    agreementNo = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.declaration = values.declaration;
        this.fields.departureDate = values.departureDate;
    }
    setOperation(value: OperationT) {
        this.operation = value;
    }
    setCurrentAgreementNo(agreementNo: number) {
        this.agreementNo = agreementNo;
    }

    get currentAgreementRecord() {
        return [...tablesStore.exportStorageT, ...tablesStore.exportT].find(
            (row) => row.agreementNo === this.agreementNo,
        );
    }
    get currentTable() {
        return this.operation === 'export'
            ? tablesStore.exportT
            : tablesStore.exportStorageT;
    }
    get currentTerms() {
        if (!this.agreementNo) return '';
        const terms = this.currentAgreementRecord.terms || 'EXW';
        return terms;
    }
    get firstRowTerms() {
        if (this.currentTable.length === 0) return '';
        return this.currentTable[0].terms;
    }
    get sectionStatus() {
        if (this.operation === 'export') return tablesStore.status.export;
        return tablesStore.status.exportStorage;
    }
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
