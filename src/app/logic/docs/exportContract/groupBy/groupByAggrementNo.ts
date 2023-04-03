/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import {
    selectProductSp,
    selectConsigneeSp,
} from '../../../../stores/spsStore/select';
import tablesStore from '../../../../stores/tablesStore/tablesStore';
import { setMSC } from '../../../../stores/tablesStore/utils/setMSC';
import { groupByInvoice } from './groupByInvoice';
import { AgreementObjT, initAgreement } from './initAgreement';

export const groupByAgreementNo = () => {
    const agreements = tablesStore.exportT.reduce<AgreementObjT>((total, row) => {
        const { aggrementNo } = row;
        let agreement = total[aggrementNo];

        if (!agreement) {
            agreement = initAgreement(row);
            total[aggrementNo] = agreement;
        }

        const isPriceUnique = agreement.products.every(
            (product) => product.record.price !== row.price,
        );

        const product = _.cloneDeep(selectProductSp(row.product));
        if (row.msc) setMSC(product);

        const productInfo = {
            record: row,
            product,
            consignee: selectConsigneeSp(row.consignee),
            isPriceUnique,
        };

        agreement.products.push(productInfo);
        agreement.priceTotal += row.priceTotal;
        agreement = groupByInvoice(agreement);
        return total;
    }, {});

    return agreements;
};
