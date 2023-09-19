import { makeAutoObservable } from 'mobx';
import { FormValuesT } from '../../types/typesUtils';
import { initPodpisant } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';

const initFields = () => ({
    podpisant: initPodpisant(),
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class SalesContractStore {
    fields = initFields();
    currentId = '';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
    }
    setCurrentId(contractNo: string) {
        this.currentId = contractNo;
    }
}

const salesContractStore = new SalesContractStore();
export default salesContractStore;
