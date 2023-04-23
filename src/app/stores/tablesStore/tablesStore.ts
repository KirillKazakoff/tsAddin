/* eslint-disable no-return-assign */
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

    setTable = {
        mates: (table: MateRowT[]) => (this.matesT = table),
        export: (table: ExportRowT[]) => (this.exportT = table),
        exportStorage: (table: ExportRowT[]) => (this.exportStorageT = table),
        inner: (table: InnerRowT[]) => (this.innerT = table),
    };
}

const tablesStore = new TablesStore();
export default tablesStore;
