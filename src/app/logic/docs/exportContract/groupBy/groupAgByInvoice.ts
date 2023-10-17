/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';

import { groupify } from '../../../utils/groupify';
import { addToAmountObj } from '../../../../stores/tablesStore/utils/initAmount';
import { initInvoice } from './initInvoice';

export const groupAgByInvoice = (agreement: AgreementT) => {
    const { invoices } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        const { invoice: invoiceNo } = row;

        const initInvoiceObj = initInvoice.main(agreement, row);
        const invoice = groupify(invoices, initInvoiceObj, invoiceNo);
        invoice.rows.push(row);

        const productGroup = groupify(
            invoice.productGroups,
            initInvoice.productGroup(row),
            `${row.product.codeName}`,
        );
        productGroup.rows.push(row);

        const productSortGroup = groupify(
            invoice.productSortGroups,
            initInvoice.productGroup(row),
            `${row.product.codeName}${row.pack}`,
        );

        addToAmountObj(invoice.amount, row.amount);
        addToAmountObj(productGroup.total, row.amount);
        addToAmountObj(productSortGroup.total, row.amount);
    });

    return agreement;
};
