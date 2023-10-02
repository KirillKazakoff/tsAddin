/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPortRu, initPortTamozhnya } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    isInvoiceOnly: false,
    terms: '',
    reiceNo: '',
    portTamozhnya: initPortTamozhnya(),
    portRu: initPortRu(),
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
        this.fields.portRu = selectSp.portRu(values.portRu);
    }
}

const requestContractStore = new RequestContractStore();
export default requestContractStore;
