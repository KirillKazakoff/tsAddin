import { ExportRowT } from '../../types/typesTables';
import { blSame, tableNotFulfilled } from '../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../pageStatusStore.ts/pageStatusStore';
import tablesStore from './tablesStore';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const setExport = (table: any[][]) => {
    table.shift();
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
            amountPlaces,
            amountTotal,
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
            amountPlaces,
            amountTotal,
            price,
            priceTotal,
        };

        if (!product || !vessel || !blNo || !transport || !price || !date) {
            pageStatusStore.setPageStatus(tableNotFulfilled('Экспорт'));
            throw new Error('tableNotFulfilled');
        }

        if (totalObj.some((rowIn) => rowIn.blNo === blNo)) {
            pageStatusStore.setPageStatus(blSame('Экспорт'));
            throw new Error('blSame');
        }

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setExport(transformedTable);
};
