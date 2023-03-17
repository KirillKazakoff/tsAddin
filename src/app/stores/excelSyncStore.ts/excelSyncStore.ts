import { makeAutoObservable } from 'mobx';

class ExcelSyncStore {
    isSync = true;
    changedTable = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSync(isSync: boolean) {
        this.isSync = isSync;
    }

    setExcelChanged(table: string) {
        this.changedTable = table;
    }
}

const excelChangesStore = new ExcelSyncStore();
export default excelChangesStore;
