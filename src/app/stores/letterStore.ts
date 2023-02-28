import { makeAutoObservable } from 'mobx';
import { TableRowT } from '../types/types';
import type { TransportT, VesselT } from '../types/typesDictionary';

type LetterT = {
    operation: string;
    table: TableRowT[];
    transport: TransportT;
    vessels: VesselT[];
};

class LetterStore {
    letter: LetterT = {
        operation: '',
        table: [],
        transport: {
            name: '',
            translation: '',
            id: '',
        },
        vessels: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    setOperation(operation: string) {
        this.letter.operation = operation;
    }

    setTable(table: TableRowT[]) {
        this.letter.table = table;
    }

    setVessels(vessels: VesselT[]) {
        this.letter.vessels = vessels;
    }

    setTransport(transport: TransportT) {
        this.letter.transport = transport;
    }
}

const letterStore = new LetterStore();
export default letterStore;
