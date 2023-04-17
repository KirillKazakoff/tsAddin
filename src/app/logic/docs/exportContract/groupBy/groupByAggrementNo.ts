/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { setMSC } from '../../../../stores/tablesStore/utils/setMSC';
import { groupByConsignee } from './groupByConsignee';
import { groupByInvoice } from './groupByInvoice';
import { groupByVesselExport } from './groupByVesselExport';
import { AgreementObjT, initAgreement } from './initAgreement';

export const groupByAgreementNo = () => {
    const agreements = tablesStore.exportT.reduce<AgreementObjT>((total, row) => {
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
        agreements[key] = groupByInvoice(agreement);
        agreements[key] = groupByVesselExport(agreement);
        agreements[key] = groupByConsignee(agreement);

        const copy = _.cloneDeep(agreements[key].productsGroupedBy);
        console.log(copy);
    });

    return agreements;
};
