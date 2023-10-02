import { makeAutoObservable } from 'mobx';
import { FormValuesT } from '../../types/typesUtils';
import tablesStore from '../tablesStore/tablesStore';

const initFields = () => ({
    filling: '',
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class SalesContractStore {
    name = 'salesContractStore';
    fields = initFields();
    currentId = '';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.filling = values.filling;
    }
    setCurrentId(contractNo: string) {
        this.currentId = contractNo;
    }

    get currentRecord() {
        return tablesStore.sales.find((row) => row.id === this.currentId);
    }
}

const salesContractStore = new SalesContractStore();
export default salesContractStore;
