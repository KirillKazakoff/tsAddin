/* eslint-disable @typescript-eslint/no-unused-vars */
import { checkEmptyTable } from '../../logic/excel/checkEmptyTable';
import { MateRowT } from '../../types/typesTables';
import { tableNotFulfilled } from '../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../pageStatusStore.ts/pageStatusStore';
import tablesStore from './tablesStore';

export const setMate = (table: any[][]) => {
    table.shift();
    if (checkEmptyTable(table)) return;

    const transformedTable = table.reduce((totalObj, row, index) => {
        const [
            reice,
            konosament,
            date,
            vessel,
            transport,
            company,
            product,
            sort,
            pack,
            amountPlaces,
            amountTotal,
            operation,
            periodCreation,
        ] = row;

        const rowObj: MateRowT = {
            operation,
            vessel,
            product: product.toLowerCase(),
            sort,
            amount: amountTotal,
            periodCreation: periodCreation || '! NOT STATED !',
        };

        if (!operation || !vessel || !product || !transport) {
            pageStatusStore.setPageStatus(tableNotFulfilled('Коносаменты'));
        }
        if (operation === 'Образец') return totalObj;

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setMates(transformedTable);
};
