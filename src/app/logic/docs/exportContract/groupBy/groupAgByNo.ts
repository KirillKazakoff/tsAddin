/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { setMSC } from '../../../../stores/tablesStore/utils/setMSC';
import { groupAgByConsignee } from './groupAgByConsignee';
import { groupAgByInvoice } from './groupAgByInvoice';
import { groupAgByVessel } from './groupAgByVessel';
import { AgreementsT, initAgreement } from './initAgreement';

export const groupAgByNo = () => {
    const table = exportContractStore.getCurrentTable();

    const agreements = table.reduce<AgreementsT>((total, row) => {
        const { agreementNo } = row;
        let agreement = total[agreementNo];

        if (!agreement) {
            agreement = initAgreement(row);
            total[agreementNo] = agreement;
        }

        const clonedRow = _.cloneDeep(row);
        if (row.msc) setMSC(clonedRow);

        agreement.rows.push(clonedRow);
        agreement.priceTotal += clonedRow.amount.priceTotal.count;
        return total;
    }, {});

    Object.entries(agreements).forEach(([key, agreement]) => {
        agreements[key] = groupAgByInvoice(agreement);
        agreements[key] = groupAgByConsignee(agreement);
        agreements[key] = groupAgByVessel(agreement);

        // const copy = _.cloneDeep(agreements[key].productsGroupedBy);
        // console.log(copy);
    });

    console.log(agreements);
    return agreements;
};
