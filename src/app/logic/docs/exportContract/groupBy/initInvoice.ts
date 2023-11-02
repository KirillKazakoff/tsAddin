/* eslint-disable @typescript-eslint/no-empty-interface */
import { initAmountObj } from '../../../../stores/tablesStore/utils/initAmount';
import type { ExportRowT } from '../../../../types/typesTables';
import type { AgreementT } from './initAgreement';

const initProductGroup = (row: ExportRowT) => {
    return {
        rows: <ExportRowT[]>[],
        record: row,
        total: initAmountObj(row.type),
    };
};

export type InvoiceProductGroupT = ReturnType<typeof initProductGroup>;
export type InvoiceProductGroupsT = { [key: string]: InvoiceProductGroupT };

const initMain = (agreement: AgreementT, row: ExportRowT) => {
    const {
        invoice: invoiceNo, date: invoiceDate, msc, consignee,
    } = row;

    return {
        record: row,
        rows: <ExportRowT[]>[],
        agreement,
        recType: row.type,
        invoiceDate,
        msc,
        invoiceNo,
        consignee,
        amount: initAmountObj(row.type),
        productGroups: <InvoiceProductGroupsT>{},
        productSortGroups: <InvoiceProductGroupsT>{},
    };
};

export interface InvoiceT extends ReturnType<typeof initMain> {}
export type InvoicesT = { [key: string]: InvoiceT };

export const initInvoice = {
    main: initMain,
    productGroup: initProductGroup,
};
