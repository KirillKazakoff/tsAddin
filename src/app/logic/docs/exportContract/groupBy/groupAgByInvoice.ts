/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';
import { InvoiceT, ProductGroupT } from '../../../../types/typesContract';
import { groupify } from '../../../utils/groupify';
import {
    addToAmountObj,
    initAmountObj,
} from '../../../../stores/tablesStore/utils/initAmount';

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
            amount: initAmountObj(row.type),
            productGroups: {},
        };
        const invoice = groupify<InvoiceT>(invoices, initInvoice, invoiceNo);
        invoice.rows.push(row);

        const initProductGroup = {
            rows: [],
            record: row,
            total: initAmountObj(row.type),
        };
        const productGroup = groupify<ProductGroupT>(
            invoice.productGroups,
            initProductGroup,
            row.product.codeName,
        );
        productGroup.rows.push(row);

        addToAmountObj(invoice.amount, row.amount);
        addToAmountObj(productGroup.total, row.amount);
    });

    return agreement;
};
