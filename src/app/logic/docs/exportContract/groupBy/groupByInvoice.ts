/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';

export const groupByInvoice = (agreement: AgreementT) => {
    agreement.products.forEach((product) => {
        const { invoice: invoiceNo, date: invoiceDate, msc } = product.record;
        let invoice = agreement.invoices[invoiceNo];

        if (!invoice) {
            invoice = {
                amountPlaces: 0,
                amountTotal: 0,
                products: [],
                invoiceDate,
                invoiceNo,
                msc,
                agreement,
                consignee: product.consignee,
            };
            agreement.invoices[invoiceNo] = invoice;
        }

        invoice.amountPlaces += product.record.amountPlaces;
        invoice.amountTotal += product.record.amountTotal;

        invoice.products.push(product);
    });

    return agreement;
};
