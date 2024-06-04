import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupByBl } from '../bl/groupByBl';
import { groupTotal } from '../../utils/groupify/groupTotal';

export const groupInvoiceKTIByNo = () => {
    const { dischargeInvoicesT, storageInvoicesT, exportStorageT } = tablesStore;
    const blGrouped = groupByBl(exportStorageT);

    const rows = [...dischargeInvoicesT, ...storageInvoicesT].map((row) => {
        const exportRow = blGrouped.find((group) => group.code === row.blNo)?.record;

        const dischargeDate = row.type === 'storageInvoicesT'
            ? dischargeInvoicesT.find((r) => r.blNo === row.blNo).dateDischarge
            : row.dateDischarge;

        return {
            row,
            exportRow,
            dischargeDate,
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
