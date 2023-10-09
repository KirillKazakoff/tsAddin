import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { ExportRowT, ExportInitRowT } from '../../../types/typesTables';
import { getExportRow } from '../getExportRow';
import tablesStore from '../tablesStore';

/* eslint-disable max-len */
export const setExport = (table: any[][]) => {
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

            try {
                // prettier-ignore
                const rowInit: ExportInitRowT = {
                    contract, seller, agent, vessel, transport, agreementNo, invoice, date, blMode, blNo, portFrom, terms, portTo, consignee, msc, product, sort, pack, places, placesTotal, price, priceTotal, id, index,
                };
                const rowObj = getExportRow(rowInit);

                rowObj.type = 'export';
                totalObj.push(rowObj);
                return totalObj;
            } catch (e) {
                console.log(e);
                return totalObj;
            }
        },
        [],
    );

    console.log(transformedTable);
    checkTable(transformedTable, 'export');
    tablesStore.setTable.export(transformedTable);
};
