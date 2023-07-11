/* eslint-disable max-len */
import { checkEmptyTable } from '../../logic/excel/checkTable/checkIsEmptyTable';
import { checkRowProps } from '../../logic/excel/checkTable/checkRowProps';
import { ExportInitRowT, ExportRowT } from '../../types/typesTables';
import { getExportRow } from './getExportRow';
import tablesStore from './tablesStore';

export const setExport = (table: any[][]) => {
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

        // prettier-ignore
        const rowInit: ExportInitRowT = {
            contract, seller, agent, vessel, transport, agreementNo, invoice, date, blMode, blNo, portFrom, terms, portTo, consignee, msc, product, sort, pack, places, placesTotal, price, priceTotal, id, index,
        };

        const rowObj = getExportRow(rowInit);
        checkRowProps(rowObj, 'Export');

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setTable.export(transformedTable);
};
