/* eslint-disable no-param-reassign */
import {
    selectAgentSp,
    selectConsigneeSp,
    selectContractSp,
    selectProductSp,
    selectSellerSp,
    selectVesselSp,
} from '../../../stores/spsStore/select';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ProductDescriptionT, ConsigneeT } from '../../../types/typesSP';
import { ExportRowT } from '../../../types/typesTables';

type ProductInfoT = {
    product: ProductDescriptionT;
    price: number;
    consignee: ConsigneeT;
    amount: number;
};

const initAgreement = (row: ExportRowT) => ({
    agreementNo: row.aggrementNo,
    agreementDate: row.date,
    contract: selectContractSp(row.contract),
    portTo: row.portTo,
    portFrom: row.portFrom,
    terms: row.terms,
    buyerInfo: selectConsigneeSp(row.buyer),
    agentInfo: selectAgentSp(row.buyer),
    sellerInfo: selectSellerSp(row.seller),
    vesselInfo: selectVesselSp(row.vessel),
    products: [],
    totalPrice: 0,
});

export type AgreementT = Omit<ReturnType<typeof initAgreement>, 'products'> & {
    products: ProductInfoT[];
};
type AgreementObjT = { [key: string]: AgreementT };

export const groupByAgreementNo = () => {
    const agreements = tablesStore.exportT.reduce<AgreementObjT>((total, row) => {
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
        total[aggrementNo].totalPrice += row.price;
        return total;
    }, {});

    return agreements;
};
