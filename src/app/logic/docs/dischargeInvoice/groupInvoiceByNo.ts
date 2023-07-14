import tablesStore from '../../../stores/tablesStore/tablesStore';
import {
    addToAmount,
    initAmount,
} from '../../../stores/tablesStore/utils/initAmount';
import { DischargeInvoiceRowT } from '../../../types/typesTables';
import { groupify } from '../../utils/groupify';
import { groupByBl } from '../exportContract/groupBy/groupByBl';

// DischargeInvoices
const initInvoice = (row: DischargeInvoiceRowT) => {
    const blGrouped = groupByBl(tablesStore.exportStorageT);
    const sameRow = blGrouped[row.blNo];

    return {
        priceTotal: initAmount(0, 2, 2),
        record: row,
        exportRecord: sameRow.record,
        rows: [],
    };
};

export type DischargeInvoiceT = ReturnType<typeof initInvoice>;
export type DischargeInvoicesT = {
    [key: string]: DischargeInvoiceT;
};

export const groupInvoiceByNo = () => {
    const { dischargeInvoicesT } = tablesStore;
    const dischargeInvoices = dischargeInvoicesT.reduce<DischargeInvoicesT>(
        (total, row) => {
            const initObj = initInvoice(row);
            const invoice = groupify<DischargeInvoiceT>(
                total,
                initObj,
                row.invoiceNo,
            );
            invoice.rows.push(row);
            addToAmount(invoice.priceTotal, row.amount.priceTotal.count);

            return total;
        },
        {},
    );

    return Object.values(dischargeInvoices);
};
