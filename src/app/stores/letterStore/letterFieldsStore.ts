import { makeAutoObservable } from 'mobx';
import { LetterFieldsT } from '../../types/typesStore';

class LetterFieldsStore {
    fields: LetterFieldsT = {
        arrivalVld: '18.02.23',
        arrivalForeign: '21.02.23',
        payment: '10.02.23',
        operation: 'eng',
        terms: 'CFR',
        ground: 'Okhotsk Sea',
        port: 'Busan',
    };

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

    setOperation(operation: string) {
        this.fields.operation = operation;
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

const letterFieldsStore = new LetterFieldsStore();
export default letterFieldsStore;
