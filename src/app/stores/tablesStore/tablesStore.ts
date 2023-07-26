/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import {
    MateRowT,
    ExportRowT,
    InnerRowT,
    NordmileRowT,
    InvoiceKTIRowT,
} from '../../types/typesTables';

class TablesStore {
    matesT: MateRowT[] = [];
    exportT: ExportRowT[] = [];
    exportStorageT: ExportRowT[] = [];
    innerT: InnerRowT[] = [];
    nordmileT: NordmileRowT[] = [];
    dischargeInvoicesT: InvoiceKTIRowT[] = [];
    storageInvoicesT: InvoiceKTIRowT[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setTable = {
        mates: (table: MateRowT[]) => (this.matesT = table),
        export: (table: ExportRowT[]) => (this.exportT = table),
        exportStorage: (table: ExportRowT[]) => (this.exportStorageT = table),
        dischargeInvoices: (table: InvoiceKTIRowT[]) => (this.dischargeInvoicesT = table),
        storageInvoices: (table: InvoiceKTIRowT[]) => (this.storageInvoicesT = table),
        inner: (table: InnerRowT[]) => (this.innerT = table),
        nordmile: (table: NordmileRowT[]) => (this.nordmileT = table),
    };
}

const tablesStore = new TablesStore();
export default tablesStore;
