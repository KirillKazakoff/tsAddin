/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';

export const groupAgByConsignee = (agreement: AgreementT) => {
    const { consignees } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        let consigneeGroup = consignees[row.consignee.codeName];

        if (!consigneeGroup) {
            consigneeGroup = {
                rows: [],
                consignee: row.consignee,
            };

            consignees[row.consignee.codeName] = consigneeGroup;
        }

        consigneeGroup.rows.push(row);
    });

    return agreement;
};
