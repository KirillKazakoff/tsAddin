/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';
import {
    addInvoiceAmount,
    initInvoiceAmount,
} from '../../../../stores/tablesStore/utils/invoiceAmount';
import { InvoiceT, ProductGroupT } from '../../../../types/typesContract';
import { groupify } from '../../../utils/getGroup';

export const groupAgByInvoice = (agreement: AgreementT) => {
    const { invoices } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        const {
            invoice: invoiceNo, date: invoiceDate, msc, consignee,
        } = row;

        const initInvoice: InvoiceT = {
            rows: [],
            invoiceDate,
            invoiceNo,
            msc,
            agreement,
            consignee,
            amount: initInvoiceAmount(),
            productGroups: {},
        };
        const invoice = groupify<InvoiceT>(invoices, initInvoice, invoiceNo);
        invoice.rows.push(row);

        const initProductGroup = {
            rows: [],
            record: row,
            total: initInvoiceAmount(),
        };
        const productGroup = groupify<ProductGroupT>(
            invoice.productGroups,
            initProductGroup,
            row.product.codeName,
        );
        productGroup.rows.push(row);

        addInvoiceAmount(invoice.amount, row.amount);
        addInvoiceAmount(productGroup.total, row.amount);
    });

    return agreement;
};
