import { ExportInitRowT, ExportRowT } from '../../types/typesTables';
import {
    selectContractSp,
    selectConsigneeSp,
    selectSellerSp,
    selectBankProdavecSp,
    selectAgentSp,
    selectVesselSp,
    selectTransportSp,
    selectPortTamozhnyaSp,
    selectPortZarubezhSp,
    selectProductSp,
} from '../spsStore/select';
import { initAmount } from './utils/initAmount';

export const getExportRow = (row: ExportInitRowT): ExportRowT => {
    const contractSp = selectContractSp(row.contract);
    const consigneeSp = selectConsigneeSp(row.consignee) || selectConsigneeSp(row.agent);

    return {
        contract: contractSp,
        seller: selectSellerSp(row.seller),
        bankSeller: selectBankProdavecSp(contractSp?.bankSeller),
        agent: selectAgentSp(row.agent),
        vessel: selectVesselSp(row.vessel),
        transport: selectTransportSp(),
        portFrom: selectPortTamozhnyaSp(row.portFrom),
        portTo: selectPortZarubezhSp(row.portTo),
        consignee: consigneeSp,
        product: selectProductSp(row.product),
        amount: {
            places: initAmount(row.places, 0, 0),
            placesTotal: initAmount(row.placesTotal, 3, 4),
            price: initAmount(row.price, 2, 2),
            priceTotal: initAmount(row.priceTotal, 3, 4),
        },
        agreementNo: row.agreementNo,
        invoice: row.invoice,
        date: row.date,
        blNo: row.blNo,
        terms: row.terms,
        sort: row.sort,
        pack: row.pack,
        msc: row.msc,
        index: row.index.toString(),
    };
};
