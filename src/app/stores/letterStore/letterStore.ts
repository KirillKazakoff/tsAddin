import { makeAutoObservable } from 'mobx';
import { TableRowT } from '../../types/types';
import type { ProductionNewT, TransportT, VesselT } from '../../types/typesSP';
import { LetterT } from '../../types/typesStore';

class LetterStore {
    letter: LetterT = {
        table: [],
        transport: {
            name: '',
            nameEng: '',
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

    setProduction(production: ProductionNewT) {
        this.letter.production = production;
    }
}

const letterStore = new LetterStore();
export default letterStore;