/* eslint-disable no-param-reassign */
import {
    selectAgentSp,
    selectBankProdavecSp,
    selectConsigneeSp,
    selectContractSp,
    selectPortZarubezhSp,
    selectProductSp,
    selectSellerSp,
    selectVesselSp,
} from '../../../stores/spsStore/select';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { ProductInfoExportT } from '../../../types/typesExportContract';
import { ExportRowT } from '../../../types/typesTables';

const initBankProdavecInfo = (contract: number) => {
    const contractSp = selectContractSp(contract);
    return selectBankProdavecSp(contractSp.bankSeller);
};

const initAgreement = (row: ExportRowT) => ({
    agreementNo: row.aggrementNo,
    agreementDate: row.date,
    contract: selectContractSp(row.contract),
    portTo: selectPortZarubezhSp(row.portTo),
    portFrom: row.portFrom,
    terms: row.terms,
    buyerInfo: selectConsigneeSp(row.buyer),
    agentInfo: selectAgentSp(row.buyer),
    bankProdavecInfo: initBankProdavecInfo(row.contract),
    sellerInfo: selectSellerSp(row.seller),
    vesselInfo: selectVesselSp(row.vessel),
    products: [],
    priceTotal: 0,
});

export type AgreementT = Omit<ReturnType<typeof initAgreement>, 'products'> & {
    products: ProductInfoExportT[];
};
type AgreementObjT = { [key: string]: AgreementT };

export const groupByAgreementNo = () => {
    const agreements = tablesStore.exportT.reduce<AgreementObjT>((total, row) => {
        const { aggrementNo } = row;
        if (!total[aggrementNo]) {
            total[aggrementNo] = initAgreement(row);
        }

        const isPriceUnique = total[aggrementNo].products.every(
            (product) => product.price !== row.price,
        );

        const productInfo = {
            product: selectProductSp(row.product),
            price: row.price,
            consignee: selectConsigneeSp(row.consignee),
            amount: row.amountTotal,
            isPriceUnique,
        };

        total[aggrementNo].products.push(productInfo);
        total[aggrementNo].priceTotal += row.priceTotal;
        return total;
    }, {});

    return agreements;
};
