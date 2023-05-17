/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';
import { addInvoiceAmount, initInvoiceAmount } from './invoiceAmount';

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
                amount: initInvoiceAmount(),
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
                total: initInvoiceAmount(),
            };
            invoice.productGroups[row.product.codeName] = productGroup;
        }
        productGroup.rows.push(row);

        addInvoiceAmount(invoice.amount, row.amount);
        addInvoiceAmount(productGroup.total, row.amount);
    });

    return agreement;
};
