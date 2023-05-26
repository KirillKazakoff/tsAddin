/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { setMSC } from '../../../../stores/tablesStore/utils/setMSC';
import { groupAgByConsignee } from './groupAgByConsignee';
import { groupAgByInvoice } from './groupAgByInvoice';
import { groupAgByVessel } from './groupAgByVessel';
import { AgreementT, AgreementsT, initAgreement } from './initAgreement';
import { groupify } from '../../../utils/getGroup';

export const groupAgByNo = () => {
    const table = exportContractStore.getCurrentTable();

    const agreements = table.reduce<AgreementsT>((total, row) => {
        const agreement = groupify<AgreementT>(total, initAgreement(row), row.id);

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

    return agreements;
};
