import { makeAutoObservable } from 'mobx';
import { LetterFieldsT } from '../../types/typesStore';

class LetterFieldsStore {
    fields: LetterFieldsT = {
        dateArrival: '',
        datePayment: '',
        operation: '',
        terms: '',
        ground: '',
        port: '',
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
