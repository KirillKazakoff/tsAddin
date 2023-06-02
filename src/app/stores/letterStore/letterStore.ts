/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { LetterStoreT, initLetterFields } from './initLetterFields';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';
import { initTransport } from '../initStoreObjects';

class LetterStore {
    fields = initLetterFields();
    transport = initTransport();

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormValuesT<LetterStoreT>) {
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
