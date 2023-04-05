import type { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import { ProductDescriptionT, ConsigneeT } from './typesSP';
import { AmountT, ExportCommonRow } from './typesTables';

export type ProductInfoExportT = {
    record: ExportCommonRow;
    product: ProductDescriptionT;
    consignee: ConsigneeT;
    isPriceUnique: boolean;
};

export type InvoiceT = {
    agreement: AgreementT;
    products: ProductInfoExportT[];
    invoiceDate: string;
    invoiceNo: string;
    msc: string;
    consignee: ConsigneeT;
    amount: {
        placesTotal: AmountT;
        places: AmountT;
        priceTotal: AmountT;
    };
};

export type InvoicesT = {
    [key: string]: InvoiceT;
};
