/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPortTamozhnya } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    isInvoiceOnly: false,
    terms: '',
    reiceNo: '',
    portTamozhnya: initPortTamozhnya(),
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class RequestContractStore {
    name: 'requestContractStore';
    fields = initFields();

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.isInvoiceOnly = values.isInvoiceOnly;
        this.fields.reiceNo = values.reiceNo;
        this.fields.terms = values.terms;
        this.fields.portTamozhnya = selectSp.portTamozhnya(values.portTamozhnya);
    }
}

const requestContractStore = new RequestContractStore();
export default requestContractStore;
