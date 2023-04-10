import { makeAutoObservable } from 'mobx';
import { MateRowT, ExportRowT, InnerRowT } from '../../types/typesTables';

class TablesStore {
    matesT: MateRowT[] = [];
    exportT: ExportRowT[] = [];
    exportStorageT: ExportRowT[] = [];
    innerT: InnerRowT[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMates(table: MateRowT[]) {
        this.matesT = table;
    }

    setExport(table: ExportRowT[]) {
        this.exportT = table;
    }

    setExportStorage(table: ExportRowT[]) {
        this.exportStorageT = table;
    }

    setInner(table: InnerRowT[]) {
        this.innerT = table;
    }
}

const tablesStore = new TablesStore();
export default tablesStore;
