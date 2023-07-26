import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT, StorageInvoiceRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import { groupByBl } from '../exportContract/groupBy/groupByBl';

const initInvoice = (row: StorageInvoiceRowT) => {
    const blGrouped = groupByBl(tablesStore.exportStorageT);
    return {
        priceTotal: 0,
        exportRecord: blGrouped[row.blNo].record,
        record: row,
        rows: <{ exportRow: ExportRowT; row: StorageInvoiceRowT }[]>[],
    };
};

export type StorageInvoiceT = ReturnType<typeof initInvoice>;
export type StorageInvoicesT = {
    [key: string]: StorageInvoiceT;
};

export const groupStorageInvoiceByNo = () => {
    const { storageInvoicesT, exportStorageT } = tablesStore;
    const blGrouped = groupByBl(exportStorageT);

    const storageInvoices = storageInvoicesT.reduce<StorageInvoicesT>(
        (total, row) => {
            const initObj = initInvoice(row);
            const invoice = groupify<StorageInvoiceT>(total, initObj, row.invoiceNo);
            invoice.rows.push({ row, exportRow: blGrouped[row.blNo].record });
            invoice.priceTotal += row.amount.priceTotal;

            return total;
        },
        {},
    );

    return Object.values(storageInvoices);
};
