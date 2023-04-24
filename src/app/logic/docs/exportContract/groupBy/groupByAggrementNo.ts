/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { setMSC } from '../../../../stores/tablesStore/utils/setMSC';
import { groupByConsignee } from './groupByConsignee';
import { groupByInvoice } from './groupByInvoice';
import { groupByVesselExport } from './groupByVesselExport';
import { AgreementObjT, initAgreement } from './initAgreement';

export const groupByAgreementNo = () => {
    const table = exportContractStore.getCurrentTable();

    const agreements = table.reduce<AgreementObjT>((total, row) => {
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
        agreements[key] = groupByConsignee(agreement);
        agreements[key] = groupByInvoice(agreement);
        agreements[key] = groupByVesselExport(agreement);

        // const copy = _.cloneDeep(agreements[key].productsGroupedBy);
        // eslint-disable-next-line no-console
        // console.log(copy);
    });

    return agreements;
};
