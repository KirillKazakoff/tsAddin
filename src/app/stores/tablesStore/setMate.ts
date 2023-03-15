/* eslint-disable @typescript-eslint/no-unused-vars */
import { MateRowT } from '../../types/typesTables';
import { letterNotFulfilled } from '../pageStatusStore.ts/pageMessages';
import pageStatusStore from '../pageStatusStore.ts/pageStatusStore';
import tablesStore from './tablesStore';

export const setMate = (table: any[][]) => {
    table.shift();
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
            periodCreation,
        };

        if (!operation || !vessel || !product || !transport) {
            pageStatusStore.setPageStatus(letterNotFulfilled);
        }
        if (operation === 'Образец') return totalObj;

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setMates(transformedTable);
};
