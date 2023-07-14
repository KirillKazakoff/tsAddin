import { AmountT, DischargeInvoiceRowT } from './typesTables';

export type DischargeInvoiceT = {
    rows: DischargeInvoiceRowT[];
    record: DischargeInvoiceRowT;
    amount: {
        priceTotal: AmountT;
    };
};

export type DischargeInvoicesT = {
    [key: string]: DischargeInvoiceT;
};
