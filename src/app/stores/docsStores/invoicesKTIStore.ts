import { makeAutoObservable } from 'mobx';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    translator: 'KIA;TNI',
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class InvoicesKTIStore {
    fields = initFields();
    name = 'invoicesKTIStore';

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.translator = values.translator;
    }
}

export default new InvoicesKTIStore();
