import { makeAutoObservable } from 'mobx';
import { TableRowT } from '../types/types';

type LetterT = {
    operation: string;
    table: TableRowT[];
    transport: string;
    vessels: string[];
};

class LetterStore {
    letter: LetterT = {
        operation: '',
        table: [],
        transport: '',
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

        const vessels = table.map((row) => row.vessel);
        this.letter.vessels = Array.from(new Set(vessels));
    }

    setTransport(transport: string) {
        this.letter.transport = transport;
    }
}

const letterStore = new LetterStore();
export default letterStore;
