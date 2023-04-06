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

// types dynamic
export type AgreementT = Omit<ReturnType<typeof initAgreement>, 'products'> & {
    products: ProductInfoExportT[];
    invoices: InvoicesT;
};
export type AgreementObjT = { [key: string]: AgreementT };
