import { InvoicesT, ProductInfoExportT } from '../../../../types/typesContract';
import { ExportRowT } from '../../../../types/typesTables';

export const initAgreement = (row: ExportRowT) => {
    const agreement = {
        record: row,
        invoices: {},
        products: [],
        priceTotal: 0,
    };
    return agreement;
};

export type AgreementT = {
    products: ProductInfoExportT[];
    invoices: InvoicesT;
    record: ExportRowT;
    priceTotal: number;
};
export type AgreementObjT = { [key: string]: AgreementT };
