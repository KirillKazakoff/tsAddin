import { InvoiceKTIRowT } from '../../../types/typesTables';
import { selectSp } from '../../spsStore/select';
import { setTable } from './setTable';

export const setStorageInvoices = (table: any[][]) => {
    table.shift();

    setTable<InvoiceKTIRowT>({
        table,
        type: 'storageInvoices',
        row: (r) => {
            const [
                blNo,
                agreementNo,
                seller,
                vessel,
                product,
                dateStorageStart,
                dateStorageEnd,
                placesTotal,
                days,
                invoiceNo,
                dateInvoice,
                price,
                priceTotal,
                operation,
                operationResult,
                dateAccountSent,
            ] = r;

            return {
                blNo,
                agreementNo,
                invoiceNo,
                seller: selectSp.seller(seller),
                vessel: selectSp.vessel(vessel),
                product: selectSp.product(product),
                dateStorageStart,
                dateStorageEnd,
                dateAccountSent,
                dateInvoice,
                amount: {
                    placesTotal,
                    price,
                    priceTotal,
                },
                days,
                operationResult,
                operation,
            };
        },
    });
};
