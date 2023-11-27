import { InvoiceKTIRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import { setTable } from './setTable';

export const setDischargeInvoices = (table: any[][]) => {
    table.shift();

    setTable<InvoiceKTIRowT>({
        table,
        type: 'dischargeInvoices',
        row: (r) => {
            const [
                blNo,
                seller,
                agreementNo,
                vessel,
                product,
                placesTotal,
                invoiceNo,
                dateInvoice,
                dateDischarge,
                price,
                priceTotal,
            ] = r;

            return {
                agreementNo,
                invoiceNo,
                blNo,
                seller: selectSp.seller(seller),
                vessel: selectSp.vessel(vessel),
                product: selectSp.product(product),
                dateDischarge,
                dateInvoice,
                amount: {
                    price,
                    placesTotal,
                    priceTotal,
                },
            };
        },
    });
};
