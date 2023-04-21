/* eslint-disable @typescript-eslint/no-unused-vars */
import { checkEmptyTable } from '../../logic/excel/utils/checkTable';
import { ExportRowT } from '../../types/typesTables';
import {
    selectContractSp,
    selectSellerSp,
    selectAgentSp,
    selectVesselSp,
    selectTransportSp,
    selectPortTamozhnyaSp,
    selectPortZarubezhSp,
    selectConsigneeSp,
    selectProductSp,
    selectBankProdavecSp,
} from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setExportStorage = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce<ExportRowT[]>((totalObj, row, index) => {
        const [
            contract,
            seller,
            buyer,
            vessel,
            transport,
            agreementNo,
            invoice,
            date,
            blMode,
            blNo,
            msc,
            product,
            sort,
            pack,
            places,
            placesTotal,
            price,
            priceTotal,
            portTo,
            operationUseless,
            id,
            consignee,
            portFrom,
        ] = row;

        const contractSp = selectContractSp(contract);

        const rowObj: ExportRowT = {
            contract: contractSp,
            seller: selectSellerSp(seller),
            bankSeller: selectBankProdavecSp(contractSp?.bankSeller),
            agent: selectAgentSp(buyer),
            vessel: selectVesselSp(vessel),
            transport: selectTransportSp(),
            portFrom: selectPortTamozhnyaSp(portFrom),
            portTo: selectPortZarubezhSp(portTo),
            consignee: selectConsigneeSp(consignee),
            product: selectProductSp(product),
            amount: {
                places: initAmount(places, 0, 0),
                placesTotal: initAmount(placesTotal, 3, 4),
                price: initAmount(price, 2, 2),
                priceTotal: initAmount(priceTotal, 3, 4),
            },
            agreementNo,
            invoice,
            date,
            blNo,

            sort,
            pack,
            msc,
            index: index.toString(),
        };

        // if (!product || !vessel || !blNo || !transport || !price || !date) {
        //     pageStatusStore.setPageStatus(tableNotFulfilled('ЭкспортХранение'));
        // }

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setExportStorage(transformedTable);
};
