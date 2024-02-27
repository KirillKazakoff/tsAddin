/* eslint-disable no-use-before-define */
import { makeAutoObservable } from 'mobx';
import { initTableStatus } from './utils/tableStatus';
import { TableStatusT } from '../../types/typesTables';
import type { InvoiceKTIRowT } from './set/setDischargeInvoices';
import type { ExportRowT } from './set/setExport';
import type { InnerRowT } from './set/setInner';
import type { MateRowT } from './set/setMates';
import type { NordmileRowT } from './set/setNordmile';
import type { SalesRowT } from './set/setSales';
import type { CustomsRowT } from './set/setCustoms';
import type { SampleInnerRowT } from './set/setSamplesInner';

class TablesStore {
    matesT: MateRowT[] = [];
    exportT: ExportRowT[] = [];
    exportStorageT: ExportRowT[] = [];
    certificatesT: ExportRowT[] = [];
    innerT: InnerRowT[] = [];
    nordmileT: NordmileRowT[] = [];
    dischargeInvoicesT: InvoiceKTIRowT[] = [];
    storageInvoicesT: InvoiceKTIRowT[] = [];
    salesT: SalesRowT[] = [];
    customsT: CustomsRowT[] = [];
    samplesInnerT: SampleInnerRowT[] = [];

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
        customs: initTableStatus(),
        samplesInnerT: initTableStatus(),
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTable(data: any, key: TableKeyT) {
        this[key] = data;
    }

    setStatus(status: TableStatusT, key: TableKeyT) {
        this.status[key] = status;
    }
}

const tablesStore = new TablesStore();

// prettier-ignore
export type TableKeyT = keyof Omit<typeof tablesStore, 'setTable' | 'setStatus' | 'status'>;
export default tablesStore;
