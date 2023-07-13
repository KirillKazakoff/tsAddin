import { AmountT, DischargeInvoiceRowT } from './typesTables';

type DischargeInvoiceT = {
    rows: DischargeInvoiceRowT[];
    record: DischargeInvoiceT;
    amount: {
        priceTotal: AmountT;
    };
};
