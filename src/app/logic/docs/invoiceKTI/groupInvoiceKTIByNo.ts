import tablesStore from '../../../stores/tablesStore/tablesStore';
import { GroupedBlT } from '../../../types/typesContract';
import { ExportRowT, InvoiceKTIRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import { groupByBl } from '../exportContract/groupBy/groupByBl';

const initInvoice = (blGrouped: GroupedBlT<ExportRowT>, row: InvoiceKTIRowT) => {
    return {
        type: row.dateDischarge ? 'discharge' : 'storage',
        priceTotal: 0,
        exportRecord: blGrouped[row.blNo].record,
        record: row,
        rows: <{ exportRow: ExportRowT; row: InvoiceKTIRowT }[]>[],
    };
};

export type InvoiceKTIT = ReturnType<typeof initInvoice> & {
    type: 'discharge' | 'storage';
};
export type InvoicesKTIT = { [key: string]: InvoiceKTIT };

export const groupInvoiceKTIByNo = () => {
    const { dischargeInvoicesT, storageInvoicesT, exportStorageT } = tablesStore;
    const rowsArray = [...dischargeInvoicesT, ...storageInvoicesT];
    const blGrouped = groupByBl(exportStorageT);

    const invoicesKTI = rowsArray.reduce<InvoicesKTIT>((total, row) => {
        const initObj = initInvoice(blGrouped, row);
        if (!row.invoiceNo) return total;
        const invoice = groupify<InvoiceKTIT>(total, initObj, row.invoiceNo);

        invoice.rows.push({ row, exportRow: blGrouped[row.blNo].record });
        invoice.priceTotal += row.amount.priceTotal;

        return total;
    }, {});

    return Object.values(invoicesKTI);
};
