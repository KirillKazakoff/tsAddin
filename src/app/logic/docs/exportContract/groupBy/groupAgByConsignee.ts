/* eslint-disable no-param-reassign */
import { groupify } from '../../../utils/getGroup';
import { AgreementT } from './initAgreement';

export const groupAgByConsignee = (agreement: AgreementT) => {
    const { consignees } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        const initObj = { rows: [], consignee: row.consignee };
        const consigneeGroup = groupify<typeof initObj>(
            consignees,
            initObj,
            row.consignee.codeName,
        );

        consigneeGroup.rows.push(row);
    });

    return agreement;
};
