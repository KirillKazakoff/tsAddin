import { makeAutoObservable } from 'mobx';
import { MateRowT, ExportRowT, ExportStorageRowT } from '../../types/typesTables';

class TablesStore {
    mates: MateRowT[] = [];
    export: ExportRowT[] = [];
    exportStorage: ExportStorageRowT[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMates(table: MateRowT[]) {
        this.mates = table;
    }

    setExport(table: ExportRowT[]) {
        this.export = table;
    }

    setExportStorage(table: ExportStorageRowT[]) {
        this.exportStorage = table;
    }
}

const tablesStore = new TablesStore();
export default tablesStore;
