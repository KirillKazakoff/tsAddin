import { makeAutoObservable } from 'mobx';
import { initPodpisant } from '../initStoreObjects';
import { FormValuesT } from '../../types/typesUtils';
import { selectSp } from '../spsStore/select';

const initFields = () => ({
    podpisant: initPodpisant(),
    isPictures: false,
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class InnerContractStore {
    name: 'innerContractStore';
    fields = initFields();

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.isPictures = values.isPictures;
    }
}

const innerContractStore = new InnerContractStore();
export default innerContractStore;
