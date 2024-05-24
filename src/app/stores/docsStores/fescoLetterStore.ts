import { makeAutoObservable } from 'mobx';
import { FormValuesT } from '../../types/typesUtils';
import { initPodpisant } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';

const initFields = () => ({
    podpisant: initPodpisant(),
    isPictures: true,
    reiceNo: '',
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class FescoLetterStore {
    fields = initFields();
    name = 'fescoLetterStore';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.isPictures = values.isPictures;
        this.fields.reiceNo = values.reiceNo;
    }
}

export default new FescoLetterStore();
