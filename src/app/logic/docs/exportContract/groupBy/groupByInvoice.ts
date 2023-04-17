/* eslint-disable no-param-reassign */
import { initAmount } from '../../../../stores/tablesStore/utils/initAmount';
import { formatCount } from '../../../utils/formatCount';
import { AgreementT } from './initAgreement';

export const groupByInvoice = (agreement: AgreementT) => {
    agreement.rows.forEach((row) => {
        const {
            invoice: invoiceNo, date: invoiceDate, msc, consignee,
        } = row;
        let invoice = agreement.productsGroupedBy.invoices[invoiceNo];

        if (!invoice) {
            invoice = {
                rows: [],
                invoiceDate,
                invoiceNo,
                msc,
                agreement,
                consignee,
                amount: {
                    places: initAmount(),
                    priceTotal: initAmount(),
                    placesTotal: initAmount(),
                },
            };
            agreement.productsGroupedBy.invoices[invoiceNo] = invoice;
        }

        const { places, priceTotal, placesTotal } = invoice.amount;

        places.count += row.amount.places.count;
        places.str = formatCount(places.count, 0, 0);

        placesTotal.count += row.amount.placesTotal.count;
        placesTotal.str = formatCount(placesTotal.count, 3, 4);

        priceTotal.count += row.amount.priceTotal.count;
        priceTotal.str = formatCount(priceTotal.count, 2, 2);

        invoice.rows.push(row);
    });

    return agreement;
};
