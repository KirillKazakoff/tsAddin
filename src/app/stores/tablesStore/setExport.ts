import { checkEmptyTable } from '../../logic/excel/utils/checkEmptyTable';
import { formatCount } from '../../logic/utils/formatCount';
import { ExportRowT } from '../../types/typesTables';
import { tableNotFulfilled } from '../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../pageStatusStore.ts/pageStatusStore';
import tablesStore from './tablesStore';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const setExport = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce<ExportRowT[]>((totalObj, row, index) => {
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
            terms,
            portFrom,
            portTo,
            consignee,
            msc,
            product,
            sort,
            pack,
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
        };

        if (!product || !vessel || !blNo || !transport || !price || !date) {
            pageStatusStore.setPageStatus(tableNotFulfilled('Экспорт'));
        }

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setExport(transformedTable);
};
