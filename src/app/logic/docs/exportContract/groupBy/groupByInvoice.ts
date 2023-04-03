/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';

export const groupByInvoice = (agreement: AgreementT) => {
    agreement.products.forEach((product) => {
        const { invoice: invoiceNo, date: invoiceDate, msc } = product.record;
        let invoice = agreement.invoices[invoiceNo];

        if (!invoice) {
            invoice = {
                products: [],
                invoiceDate,
                invoiceNo,
                msc,
                agreement,
                consignee: product.consignee,
            };
            agreement.invoices[invoiceNo] = invoice;
        }

        if (invoice.invoiceNo !== product.record.invoice) return;

        invoice.products.push(product);
    });

    return agreement;
};
