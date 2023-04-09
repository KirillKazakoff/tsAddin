/* eslint-disable no-param-reassign */
import { initAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { formatCount } from '../../../utils/formatCount';
import { AgreementT } from './initAgreement';

export const groupByInvoice = (agreement: AgreementT) => {
    agreement.products.forEach((product) => {
        const { record } = product;
        const { invoice: invoiceNo, date: invoiceDate, msc } = record;
        let invoice = agreement.invoices[invoiceNo];

        if (!invoice) {
            invoice = {
                products: [],
                invoiceDate,
                invoiceNo,
                msc,
                agreement,
                consignee: product.consignee,
                amount: {
                    places: initAmount(),
                    priceTotal: initAmount(),
                    placesTotal: initAmount(),
                },
            };
            agreement.invoices[invoiceNo] = invoice;
        }

        const { places, priceTotal, placesTotal } = invoice.amount;

        places.count += record.amount.places.count;
        places.str = formatCount(places.count, 0, 0);

        placesTotal.count += record.amount.placesTotal.count;
        placesTotal.str = formatCount(placesTotal.count, 3, 4);

        priceTotal.count += record.amount.priceTotal.count;
        priceTotal.str = formatCount(priceTotal.count, 2, 2);

        invoice.products.push(product);
    });

    return agreement;
};
