import { makeAutoObservable } from 'mobx';
import { MateRowT, ExportRowT, ExportStorageRowT } from '../../types/typesTables';

class TablesStore {
    matesT: MateRowT[] = [];
    exportT: ExportRowT[] = [];
    exportStorageT: ExportStorageRowT[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMates(table: MateRowT[]) {
        this.matesT = table;
    }

    setExport(table: ExportRowT[]) {
        this.exportT = table;
    }

    setExportStorage(table: ExportStorageRowT[]) {
        this.exportStorageT = table;
    }
}

const tablesStore = new TablesStore();
export default tablesStore;
