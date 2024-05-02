import { makeAutoObservable } from 'mobx';
import { OperationT } from '../../types/typesTables';
import { initPodpisant } from '../initStoreObjects';
import tablesStore from '../tablesStore/tablesStore';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    podpisant: initPodpisant(),
    departureDate: '',
    isPictures: false,
    isNonComFCA: false,
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class ExportContractStore {
    name = 'exportContractStore';
    fields = initFields();
    operation: OperationT = 'export';
    currentId = '';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.departureDate = values.departureDate;
        this.fields.isPictures = values.isPictures;
        this.fields.isNonComFCA = values.isNonComFCA;
    }
    setOperation(value: OperationT) {
        this.operation = value;
    }
    setCurrentId(agreementId: string) {
        this.currentId = agreementId;
    }

    get currentAgreementRecord() {
        return this.currentTable.find((row) => row.id === this.currentId);
    }
    get currentTable() {
        if (this.operation === 'export') return tablesStore.exportT;
        if (this.operation === 'export_storage') return tablesStore.exportStorageT;
        return tablesStore.certificatesT;
    }
    get currentTerms() {
        if (!this.currentId) return '';
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
