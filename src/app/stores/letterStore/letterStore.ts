import { makeAutoObservable } from 'mobx';
import { initLetterFields } from './initLetterFields';

class LetterStore {
    fields = initLetterFields();

    constructor() {
        makeAutoObservable(this);
    }

    setPayment(date: string) {
        this.fields.payment = date;
    }

    setArrivalVld(date: string) {
        this.fields.arrivalVld = date;
    }

    setArrivalForeign(date: string) {
        this.fields.arrivalForeign = date;
    }

    toggleIsExport() {
        this.fields.isExport = !this.fields.isExport;
    }

    setTerms(terms: string) {
        this.fields.terms = terms;
    }

    setGround(ground: string) {
        this.fields.ground = ground;
    }

    setPort(port: string) {
        this.fields.port = port;
    }
}

const letterStore = new LetterStore();
export default letterStore;
