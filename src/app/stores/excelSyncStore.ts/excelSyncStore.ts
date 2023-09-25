import { makeAutoObservable } from 'mobx';

export type AppStatusT = 'Offer' | 'Docs' | 'Sales' | 'Init' | 'NoRoute';

class ExcelSyncStore {
    isSync = true;
    isLoading = true;
    changedTable = '';
    appStatus: AppStatusT = 'Init';

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

    setAppStatus(status: AppStatusT) {
        this.appStatus = status;
    }
}

const excelSyncStore = new ExcelSyncStore();
export default excelSyncStore;
