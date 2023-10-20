/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { setMSC } from '../../../../stores/tablesStore/utils/setMSC';
import { groupAgByInvoice } from './groupAgByInvoice';
import { AgreementsT, initAgreement } from './initAgreement';
import { groupify } from '../../../utils/groupify';
import { groupByBl } from './groupByBl';
import { setCOHCStatus } from './setCOHCStatus';

export const groupAgByNo = () => {
    const table = exportContractStore.currentTable;

    const agreements = table.reduce<AgreementsT>((total, row) => {
        const clonedRow = _.cloneDeep(row);
        const agreement = groupify(total, initAgreement(clonedRow), row.id);

        if (row.msc) setMSC(clonedRow);

        agreement.rows.push(clonedRow);
        agreement.priceTotal += clonedRow.amount.priceTotal.count;
        return total;
    }, {});

    Object.entries(agreements).forEach(([key, agreement]) => {
        agreements[key] = groupAgByInvoice(agreement);
        agreements[key].productsGroupedBy.bl = groupByBl(agreement.rows);
        agreements[key] = setCOHCStatus(agreement);
    });

    return Object.values(agreements);
};
