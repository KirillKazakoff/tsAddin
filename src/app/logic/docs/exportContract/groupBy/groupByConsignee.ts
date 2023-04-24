/* eslint-disable no-param-reassign */
import { selectConsigneeSp } from '../../../../stores/spsStore/select';
import { AgreementT } from './initAgreement';

export const groupByConsignee = (agreement: AgreementT) => {
    const { consignees } = agreement.productsGroupedBy;

    agreement.rows.forEach((row) => {
        row.consignee = row.consignee || selectConsigneeSp(row.agent.code);
        if (!row.consignee) return;
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
