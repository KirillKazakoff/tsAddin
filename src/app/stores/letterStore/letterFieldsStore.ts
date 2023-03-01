import { makeAutoObservable } from 'mobx';
import { LetterFieldsT } from '../../types/typesStore';

class LetterFieldsStore {
    fields: LetterFieldsT = {
        dateArrival: '18.02.23',
        datePayment: '10.02.23',
        operation: 'eng',
        terms: 'CFR',
        ground: 'Okhotsk Sea',
        port: 'Busan',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setDatePayment(date: string) {
        this.fields.datePayment = date;
    }

    setDateArrival(date: string) {
        this.fields.dateArrival = date;
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
