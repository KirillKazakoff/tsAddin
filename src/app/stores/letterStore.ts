import { makeAutoObservable } from 'mobx';
import { TableRowT } from '../types/types';
import type { ProductionNewT, TransportT, VesselT } from '../types/typesSP';

type LetterT = {
    operation: string;
    table: TableRowT[];
    transport: TransportT;
    vessels: VesselT[];
    production: ProductionNewT;
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
        production: {},
    };

    constructor() {
        makeAutoObservable(this);
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

    setOperation(operation: string) {
        this.letter.operation = operation;
    }

    setProduction(production: ProductionNewT) {
        this.letter.production = production;
    }
}

const letterStore = new LetterStore();
export default letterStore;
