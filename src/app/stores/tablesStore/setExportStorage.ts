import { checkEmptyTable } from '../../logic/excel/utils/checkEmptyTable';
import { formatCount } from '../../logic/utils/formatCount';
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
            places,
            amount: {
                places: {
                    str: formatCount(places, 0, 0),
                    count: places,
                },
                placesTotal: {
                    str: formatCount(placesTotal, 3, 4),
                    count: placesTotal,
                },
                price: {
                    str: formatCount(price, 2, 2),
                    count: price,
                },
                priceTotal: {
                    str: formatCount(priceTotal, 3, 4),
                    count: priceTotal,
                },
            },
            id,
        };

        // const isEmptyRow = row.every((value) => !value);
        // if (isEmptyRow) return totalObj;

        // if (!product || !vessel || !blNo || !transport || !price || !date) {
        //     pageStatusStore.setPageStatus(tableNotFulfilled('ЭкспортХранение'));
        // }

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setExportStorage(transformedTable);
};
