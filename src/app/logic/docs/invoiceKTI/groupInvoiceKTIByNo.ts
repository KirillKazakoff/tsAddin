import tablesStore from '../../../stores/tablesStore/tablesStore';
import { GroupedBlT } from '../../../types/typesContract';
import { ExportRowT, InvoiceKTIRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import { groupByBl } from '../exportContract/groupBy/groupByBl';

const initInvoice = (blGrouped: GroupedBlT, row: InvoiceKTIRowT) => {
    return {
        priceTotal: 0,
        exportRecord: blGrouped[row.blNo].record,
        record: row,
        rows: <{ exportRow: ExportRowT; row: InvoiceKTIRowT }[]>[],
    };
};

export type InvoiceKTIT = ReturnType<typeof initInvoice>;
export type InvoicesKTIT = { [key: string]: InvoiceKTIT };

export const groupInvoiceKTIByNo = (type: 'discharge' | 'storage') => {
    const { dischargeInvoicesT, storageInvoicesT, exportStorageT } = tablesStore;
    const table = type === 'discharge' ? dischargeInvoicesT : storageInvoicesT;
    const blGrouped = groupByBl(exportStorageT);

    const invoicesKTI = table.reduce<InvoicesKTIT>((total, row) => {
        const initObj = initInvoice(blGrouped, row);
        const invoice = groupify<InvoiceKTIT>(total, initObj, row.invoiceNo);

        invoice.rows.push({ row, exportRow: blGrouped[row.blNo].record });
        invoice.priceTotal += row.amount.priceTotal;

        return total;
    }, {});

    return Object.values(invoicesKTI);
};
