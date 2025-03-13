import { makeAutoObservable } from 'mobx';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    dt: '',
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class BuhDTStore {
    fields = initFields();
    name = 'buhDTStore';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.dt = values.dt;
    }
}

export default new BuhDTStore();
