/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initLetterFields } from './initLetterFields';
import { selectSp } from '../spsStore/select';

class LetterStore {
    fields = initLetterFields();

    constructor() {
        makeAutoObservable(this);
    }

    setField = {
        transport: (value: string) => (this.fields.transport = selectSp.transport(value)),
        payment: (value: string) => (this.fields.payment = value),
        arrivalVld: (value: string) => (this.fields.arrivalVld = value),
        arrivalForeign: (value: string) => (this.fields.arrivalForeign = value),
        terms: (value: string) => (this.fields.terms = value),
        ground: (value: string) => (this.fields.ground = value),
        port: (value: string) => {
            if (this.fields.isExport) {
                this.fields.port = selectSp.portZarubezh(value);
            } else {
                this.fields.port = selectSp.portRu(value);
            }
        },
    };

    toggleIsExport = () => (this.fields.isExport = !this.fields.isExport);
}

const letterStore = new LetterStore();
export default letterStore;
