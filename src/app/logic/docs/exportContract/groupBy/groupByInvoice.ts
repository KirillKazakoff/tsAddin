/* eslint-disable no-param-reassign */
import {
    addToAmount,
    initAmount,
} from '../../../../stores/tablesStore/utils/initAmount';
import { AgreementT } from './initAgreement';

export const groupByInvoice = (agreement: AgreementT) => {
    const { invoices } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        const {
            invoice: invoiceNo, date: invoiceDate, msc, consignee,
        } = row;
        let invoice = invoices[invoiceNo];

        if (!invoice) {
            invoice = {
                rows: [],
                invoiceDate,
                invoiceNo,
                msc,
                agreement,
                consignee,
                amount: {
                    places: initAmount(0, 0, 0),
                    priceTotal: initAmount(0, 3, 4),
                    placesTotal: initAmount(0, 2, 2),
                },
                productGroups: {},
            };
            invoices[invoiceNo] = invoice;
        }
        invoice.rows.push(row);

        let productGroup = invoice.productGroups[row.product.codeName];
        if (!productGroup) {
            productGroup = {
                rows: [],
                record: row,
                total: initAmount(0, 3, 4),
            };
            invoice.productGroups[row.product.codeName] = productGroup;
        }
        productGroup.rows.push(row);

        const { places, priceTotal, placesTotal } = invoice.amount;
        addToAmount(places, row.amount.places.count);
        addToAmount(priceTotal, row.amount.priceTotal.count);
        addToAmount(placesTotal, row.amount.placesTotal.count);
        addToAmount(productGroup.total, row.amount.placesTotal.count);
    });

    return agreement;
};
