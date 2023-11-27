import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupTotal } from '../../utils/groupTotal';
import { groupByBl } from '../exportContract/groupBy/groupByBl';

export const groupInvoiceKTIByNo = () => {
    const { dischargeInvoicesT, storageInvoicesT, exportStorageT } = tablesStore;
    const blGrouped = groupByBl(exportStorageT);

    const rows = [...dischargeInvoicesT, ...storageInvoicesT].map((row) => {
        const exportRow = blGrouped.find((group) => group.code === row.blNo)?.record;

        return {
            row,
            exportRow,
            type: row.type,
            amount: row.amount,
        };
    });

    return groupTotal({
        rows,
        input: (row) => ({
            init: () => !!row.row.invoiceNo,
            code: row.row.invoiceNo,
        }),
    });
};

export type InvoiceKTIGroupT = ReturnType<typeof groupInvoiceKTIByNo>[number];
