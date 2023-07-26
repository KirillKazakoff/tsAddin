/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import {
    MateRowT,
    ExportRowT,
    InnerRowT,
    NordmileRowT,
    DischargeInvoiceRowT,
    StorageInvoiceRowT,
} from '../../types/typesTables';

class TablesStore {
    matesT: MateRowT[] = [];
    exportT: ExportRowT[] = [];
    exportStorageT: ExportRowT[] = [];
    innerT: InnerRowT[] = [];
    nordmileT: NordmileRowT[] = [];
    dischargeInvoicesT: DischargeInvoiceRowT[] = [];
    storageInvoicesT: StorageInvoiceRowT[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setTable = {
        mates: (table: MateRowT[]) => (this.matesT = table),
        export: (table: ExportRowT[]) => (this.exportT = table),
        exportStorage: (table: ExportRowT[]) => (this.exportStorageT = table),
        dischargeInvoices: (table: DischargeInvoiceRowT[]) => (this.dischargeInvoicesT = table),
        storageInvoices: (table: StorageInvoiceRowT[]) => (this.storageInvoicesT = table),
        inner: (table: InnerRowT[]) => (this.innerT = table),
        nordmile: (table: NordmileRowT[]) => (this.nordmileT = table),
    };
}

const tablesStore = new TablesStore();
export default tablesStore;
