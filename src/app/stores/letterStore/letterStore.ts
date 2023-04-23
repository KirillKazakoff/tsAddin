/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initLetterFields } from './initLetterFields';

class LetterStore {
    fields = initLetterFields();

    constructor() {
        makeAutoObservable(this);
    }

    setField = {
        payment: (value: string) => (this.fields.payment = value),
        arrivalVld: (value: string) => (this.fields.arrivalVld = value),
        arrivalForeign: (value: string) => (this.fields.arrivalForeign = value),
        terms: (value: string) => (this.fields.terms = value),
        ground: (value: string) => (this.fields.ground = value),
        port: (value: string) => (this.fields.port = value),
    };

    toggleIsExport = () => (this.fields.isExport = !this.fields.isExport);
}

const letterStore = new LetterStore();
export default letterStore;
