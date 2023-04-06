/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { setMSC } from '../../../../stores/tablesStore/utils/setMSC';
import { groupByInvoice } from './groupByInvoice';
import { AgreementObjT, initAgreement } from './initAgreement';

export const groupByAgreementNo = () => {
    const agreements = tablesStore.exportT.reduce<AgreementObjT>((total, row) => {
        const { agreementNo } = row;
        let agreement = total[agreementNo];

        if (!agreement) {
            agreement = initAgreement(row);
            total[agreementNo] = agreement;
        }

        const isPriceUnique = agreement.products.every(
            (product) => product.record.amount.price.count !== row.amount.price.count,
        );

        const product = _.cloneDeep(row.product);
        if (row.msc) setMSC(product);

        const productInfo = _.cloneDeep({
            record: row,
            product,
            consignee: row.consignee,
            isPriceUnique,
        });

        agreement.products.push(productInfo);
        agreement.priceTotal += row.amount.priceTotal.count;
        return total;
    }, {});

    Object.keys(agreements).forEach((key) => {
        agreements[key] = groupByInvoice(agreements[key]);
    });
    return agreements;
};
