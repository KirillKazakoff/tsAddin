import tablesStore from '../../../stores/tablesStore/tablesStore';
import {
    addToAmount,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import { DischargeInvoiceRowT, ExportRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import { groupByBl } from '../exportContract/groupBy/groupByBl';

// DischargeInvoices
const initInvoice = (row: DischargeInvoiceRowT) => {
    return {
        priceTotal: initAmount(0, 2, 2),
        record: row,
        rows: <{ exportRow: ExportRowT; row: DischargeInvoiceRowT }[]>[],
    };
};

export type DischargeInvoiceT = ReturnType<typeof initInvoice>;
export type DischargeInvoicesT = {
    [key: string]: DischargeInvoiceT;
};

export const groupInvoiceByNo = () => {
    const { dischargeInvoicesT, exportStorageT } = tablesStore;
    const blGrouped = groupByBl(exportStorageT);

    const dischargeInvoices = dischargeInvoicesT.reduce<DischargeInvoicesT>(
        (total, row) => {
            const initObj = initInvoice(row);
            const invoice = groupify<DischargeInvoiceT>(
                total,
                initObj,
                row.invoiceNo,
            );
            invoice.rows.push({ row, exportRow: blGrouped[row.blNo].record });
            addToAmount(invoice.priceTotal, row.amount.priceTotal.count);

            return total;
        },
        {},
    );

    // console.log(dischargeInvoices);
    return Object.values(dischargeInvoices);
};
