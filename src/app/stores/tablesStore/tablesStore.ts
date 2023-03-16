import { makeAutoObservable } from 'mobx';
import { MateRowT, ExportRowT } from '../../types/typesTables';

class TablesStore {
    mates: MateRowT[] = [];
    export: ExportRowT[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMates(table: MateRowT[]) {
        this.mates = table;
    }

    setExport(table: ExportRowT[]) {
        this.export = table;
    }
}

const tablesStore = new TablesStore();
export default tablesStore;
