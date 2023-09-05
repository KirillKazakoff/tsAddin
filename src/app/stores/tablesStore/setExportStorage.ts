/* eslint-disable max-len */
// import _ from 'lodash';
import { excludeOfEmptyRows } from '../../logic/excel/checkTable/excludeOfEmptyRows';
import { checkTable } from '../../logic/excel/checkTable/checkTable';
import { ExportInitRowT, ExportRowT } from '../../types/typesTables';
import { getExportRow } from './getExportRow';
import tablesStore from './tablesStore';

export const setExportStorage = (table: any[][]) => {
    table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<ExportRowT[]>(
        (totalObj, row, index) => {
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
                placesLeft,
                datePusan,
                dateClose,
            ] = row;

            // prettier-ignore
            const rowInit: ExportInitRowT = {
                contract, seller, agent, vessel, transport, agreementNo, invoice, date, blMode, blNo, portFrom, portTo, consignee, msc, product, sort, pack, places, placesTotal, price, priceTotal, id, index, placesLeft, datePusan, dateClose,
            };
            const rowObj = getExportRow(rowInit);

            totalObj.push(rowObj);
            return totalObj;
        },
        [],
    );

    checkTable(transformedTable, 'exportStorage');
    tablesStore.setTable.exportStorage(transformedTable);
};
