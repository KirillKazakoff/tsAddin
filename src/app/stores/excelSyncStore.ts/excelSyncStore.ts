import { makeAutoObservable } from 'mobx';

class ExcelSyncStore {
    isSync = true;
    changedTable = '';
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setSync(isSync: boolean) {
        this.isSync = isSync;
    }

    setExcelChanged(table: string) {
        this.changedTable = table;
    }

    setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }
}

const excelSyncStore = new ExcelSyncStore();
export default excelSyncStore;
