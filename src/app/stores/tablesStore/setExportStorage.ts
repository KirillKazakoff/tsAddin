/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    checkEmptyTable,
    checkNotFulfilledRow,
} from '../../logic/excel/utils/checkTable';
import { ExportInitRowT, ExportRowT } from '../../types/typesTables';
import { getExportRow } from './getExportRow';
import tablesStore from './tablesStore';

export const setExportStorage = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce<ExportRowT[]>((totalObj, row, index) => {
        const [
            contract,
            seller,
            agent,
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

        // prettier-ignore
        const rowInit: ExportInitRowT = {
            contract, seller, agent, vessel, transport, agreementNo, invoice, date, blMode, blNo, portFrom, portTo, consignee, msc, product, sort, pack, places, placesTotal, price, priceTotal, id, index,
        };
        const rowObj = getExportRow(rowInit);

        checkNotFulfilledRow(rowObj, 'Export_Storage');

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setTable.exportStorage(transformedTable);
};
