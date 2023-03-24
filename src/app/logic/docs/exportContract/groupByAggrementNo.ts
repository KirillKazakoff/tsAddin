/* eslint-disable no-param-reassign */
import {
    selectConsigneeSp,
    selectProductSp,
    selectSellerSp,
    selectVesselSp,
} from '../../../stores/spsStore/select';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ExportRowT } from '../../../types/typesTables';

const initAgreement = (row: ExportRowT) => ({
    agreementNo: row.aggrementNo,
    portTo: row.portTo,
    portFrom: row.portFrom,
    terms: row.terms,
    buyerInfo: selectConsigneeSp(row.buyer),
    sellerInfo: selectSellerSp(row.seller),
    vesselInfo: selectVesselSp(row.vessel),
    products: [],
});

export type AgreementT = ReturnType<typeof initAgreement>;
type AgreementObjT = { [key: string]: AgreementT };

export const groupByAggrementNo = () => {
    const res = tablesStore.exportT.reduce<AgreementObjT>((total, row) => {
        const { aggrementNo } = row;
        if (!total[aggrementNo]) {
            total[aggrementNo] = initAgreement(row);
        }

        const productInfo = {
            product: selectProductSp(row.product),
            price: row.price,
            consignee: selectConsigneeSp(row.consignee),
            amount: row.amountTotal,
        };

        total[aggrementNo].products.push(productInfo);
        return total;
    }, {});

    return res;
};
