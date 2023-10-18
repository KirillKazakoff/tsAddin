/* eslint-disable no-param-reassign */
import {
    addToAmountObj,
    initAmountObj,
} from '../../../../stores/tablesStore/utils/initAmount';
import { groupify } from '../../../utils/groupify';
import { AgreementT } from './initAgreement';
import { InvoiceProductGroupsT } from './initInvoice';

export const groupAgByConsignee = (agreement: AgreementT) => {
    const { consignees } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        const initObj = {
            rows: [],
            consignee: row.consignee,
            productGroups: <InvoiceProductGroupsT>{},
        };
        const consigneeGroup = groupify<typeof initObj>(
            consignees,
            initObj,
            row.consignee.codeName,
        );

        if (!consigneeGroup.productGroups[row.product.codeName]) {
            consigneeGroup.productGroups[row.product.codeName] = {
                total: initAmountObj(row.type),
                rows: [],
                record: row,
            };
        }
        const productGroup = consigneeGroup.productGroups[row.product.codeName];
        addToAmountObj(productGroup.total, row.amount);

        consigneeGroup.rows.push(row);
    });

    return agreement;
};
