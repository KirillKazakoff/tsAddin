/* eslint-disable no-param-reassign */
import {
    addProductAmount,
    initProductAmount,
} from '../../../../stores/tablesStore/utils/specialAmount';
import { ProductGroupsT } from '../../../../types/typesContract';
import { groupify } from '../../../utils/groupify';
import { AgreementT } from './initAgreement';

export const groupAgByConsignee = (agreement: AgreementT) => {
    const { consignees } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        const initObj = {
            rows: [],
            consignee: row.consignee,
            productGroups: <ProductGroupsT>{},
        };
        const consigneeGroup = groupify<typeof initObj>(
            consignees,
            initObj,
            row.consignee.codeName,
        );

        if (!consigneeGroup.productGroups[row.product.codeName]) {
            consigneeGroup.productGroups[row.product.codeName] = {
                total: initProductAmount(),
                rows: [],
                record: row,
            };
        }
        const productGroup = consigneeGroup.productGroups[row.product.codeName];
        addProductAmount(productGroup.total, row.amount);

        consigneeGroup.rows.push(row);
    });

    return agreement;
};
