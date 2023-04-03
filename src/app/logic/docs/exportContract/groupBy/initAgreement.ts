import {
    selectContractSp,
    selectBankProdavecSp,
    selectPortZarubezhSp,
    selectAgentSp,
    selectSellerSp,
    selectVesselSp,
    selectTransportSp,
    selectPortTamozhnyaSp,
} from '../../../../stores/spsStore/select';
import { InvoicesT, ProductInfoExportT } from '../../../../types/typesContract';
import { ExportCommonRow } from '../../../../types/typesTables';

const initBankProdavecInfo = (contract: number) => {
    const contractSp = selectContractSp(contract);
    return selectBankProdavecSp(contractSp.bankSeller);
};

export const initAgreement = (row: ExportCommonRow) => ({
    agreementNo: row.aggrementNo,
    agreementDate: row.date,
    contract: selectContractSp(row.contract),
    portTo: selectPortZarubezhSp(row.portTo),
    portFrom: selectPortTamozhnyaSp(row.portFrom),
    terms: row.terms,
    agentInfo: selectAgentSp(row.buyer),
    bankProdavecInfo: initBankProdavecInfo(row.contract),
    sellerInfo: selectSellerSp(row.seller),
    vesselInfo: selectVesselSp(row.vessel),
    transport: selectTransportSp(),
    invoices: {},
    products: [],
    priceTotal: 0,
});

// types dynamic
export type AgreementT = Omit<ReturnType<typeof initAgreement>, 'products'> & {
    products: ProductInfoExportT[];
    invoices: InvoicesT;
};
export type AgreementObjT = { [key: string]: AgreementT };
