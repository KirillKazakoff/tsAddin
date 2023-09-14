/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import {
    MateRowT,
    ExportRowT,
    InnerRowT,
    NordmileRowT,
    InvoiceKTIRowT,
    CertificateRowT,
    TableStatusT,
    SalesRowT,
} from '../../types/typesTables';
import { initTableStatus } from './utils/tableStatus';

class TablesStore {
    matesT: MateRowT[] = [];
    exportT: ExportRowT[] = [];
    exportStorageT: ExportRowT[] = [];
    innerT: InnerRowT[] = [];
    nordmileT: NordmileRowT[] = [];
    dischargeInvoicesT: InvoiceKTIRowT[] = [];
    storageInvoicesT: InvoiceKTIRowT[] = [];
    certificatesT: CertificateRowT[] = [];
    sales: SalesRowT[] = [];

    status = {
        export: initTableStatus(),
        exportStorage: initTableStatus(),
        mates: initTableStatus(),
        inner: initTableStatus(),
        nordmile: initTableStatus(),
        certificates: initTableStatus(),
        dischargeInvoices: initTableStatus(),
        storageInvoices: initTableStatus(),
        sales: initTableStatus(),
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTable = {
        mates: (table: MateRowT[]) => (this.matesT = table),
        export: (table: ExportRowT[]) => (this.exportT = table),
        exportStorage: (table: ExportRowT[]) => (this.exportStorageT = table),
        dischargeInvoices: (table: InvoiceKTIRowT[]) => (this.dischargeInvoicesT = table),
        storageInvoices: (table: InvoiceKTIRowT[]) => (this.storageInvoicesT = table),
        certificates: (table: CertificateRowT[]) => (this.certificatesT = table),
        inner: (table: InnerRowT[]) => (this.innerT = table),
        nordmile: (table: NordmileRowT[]) => (this.nordmileT = table),
        sales: (table: SalesRowT[]) => (this.sales = table),
    };
    setStatus(status: TableStatusT, key: TableKeyT) {
        this.status[key] = status;
    }
}

const tablesStore = new TablesStore();
export type TableKeyT = keyof { [P in keyof typeof tablesStore.setTable]: string };

export default tablesStore;
