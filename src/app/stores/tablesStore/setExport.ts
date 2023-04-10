import { checkEmptyTable } from '../../logic/excel/utils/checkEmptyTable';
import { ExportRowT } from '../../types/typesTables';
import { tableNotFulfilled } from '../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../pageStatusStore.ts/pageStatusStore';
import {
    selectAgentSp,
    selectBankProdavecSp,
    selectConsigneeSp,
    selectContractSp,
    selectPortTamozhnyaSp,
    selectPortZarubezhSp,
    selectProductSp,
    selectSellerSp,
    selectTransportSp,
    selectVesselSp,
} from '../spsStore/select';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const setExport = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce<ExportRowT[]>((totalObj, row) => {
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
            portFrom,
            terms,
            portTo,
            consignee,
            msc,
            product,
            sort,
            pack,
            places,
            placesTotal,
            price,
            priceTotal,
            id,
        ] = row;

        const contractSp = selectContractSp(contract);

        const rowObj: ExportRowT = {
            contract: contractSp,
            seller: selectSellerSp(seller),
            bankSeller: selectBankProdavecSp(contractSp.bankSeller),
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
            terms,
            sort,
            pack,
            msc,
        };

        if (!product || !vessel || !blNo || !transport || !price || !date) {
            pageStatusStore.setPageStatus(tableNotFulfilled('Экспорт'));
        }

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setExport(transformedTable);
};
