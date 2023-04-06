import { makeAutoObservable } from 'mobx';
import { MateRowT, ExportRowT } from '../../types/typesTables';

class TablesStore {
    matesT: MateRowT[] = [];
    exportT: ExportRowT[] = [];
    exportStorageT: ExportRowT[] = [];

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
}

const tablesStore = new TablesStore();
export default tablesStore;
