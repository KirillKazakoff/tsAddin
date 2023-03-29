import { checkEmptyTable } from '../../logic/excel/utils/checkEmptyTable';
import { ExportStorageRowT } from '../../types/typesTables';
import { blSame, tableNotFulfilled } from '../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../pageStatusStore.ts/pageStatusStore';
import tablesStore from './tablesStore';

export const setExportStorage = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce<ExportStorageRowT[]>((totalObj, row) => {
        const [
            contract,
            seller,
            buyer,
            vessel,
            transport,
            aggrementNo,
            invoice,
            date,
            blMode,
            blNo,
            msc,
            product,
            sort,
            pack,
            amountPlaces,
            amountTotal,
            price,
            priceTotal,
            portTo,
            id,
            consignee,
            portFrom,
        ] = row;

        const rowObj = {
            contract,
            seller,
            buyer,
            vessel,
            transport,
            aggrementNo,
            invoice,
            date,
            blNo,
            portFrom,
            portTo,
            consignee,
            msc,
            product,
            sort,
            pack,
            amountPlaces,
            amountTotal,
            price,
            priceTotal,
            id,
        };

        // const isEmptyRow = row.every((value) => !value);
        // if (isEmptyRow) return totalObj;

        // if (!product || !vessel || !blNo || !transport || !price || !date) {
        //     pageStatusStore.setPageStatus(tableNotFulfilled('ЭкспортХранение'));
        // }

        if (totalObj.some((rowIn) => rowIn.blNo === blNo)) {
            pageStatusStore.setPageStatus(blSame('Экспорт'));
        }

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setExportStorage(transformedTable);
};
