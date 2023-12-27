/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';
import { initPortRu, initTransport } from '../initStoreObjects';
import { PortRuT } from '../spsStore/set/setPortsRu';
import { PortZarubezhT } from '../spsStore/set/setPortsZarubezh';

export const initFields = () => ({
    arrivalVld: '',
    arrivalForeign: '',
    payment: '',
    isExport: false,
    terms: '',
    ground: '',
    port: <PortZarubezhT | PortRuT>initPortRu(),
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class LetterStore {
    name = 'letterStore';
    fields = initFields();
    transport = initTransport();

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.payment = values.payment;
        this.fields.arrivalVld = values.arrivalVld;
        this.fields.arrivalForeign = values.arrivalForeign;
        this.fields.terms = values.terms;
        this.fields.ground = values.ground;
        this.fields.isExport = values.isExport;
        this.fields.port = this.fields.isExport
            ? selectSp.portZarubezh(values.port)
            : selectSp.portRu(values.port);
    }

    setTransport(value: string) {
        this.transport = selectSp.transport(value);
    }
}

const letterStore = new LetterStore();
export default letterStore;
