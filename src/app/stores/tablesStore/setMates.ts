/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    checkEmptyTable,
    checkNotFulfilledRow,
} from '../../logic/excel/utils/checkTable';
import { MateRowT } from '../../types/typesTables';
import tablesStore from './tablesStore';
import { initAmount } from './utils/initAmount';

export const setMates = (table: any[][]) => {
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
            amount: {
                total: initAmount(amountTotal, 2, 3),
            },
            periodCreation: periodCreation || '! NOT STATED !',
            index: index.toString(),
        };

        checkNotFulfilledRow(rowObj, 'Mates');
        if (operation === 'Образец') return totalObj;

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    tablesStore.setTable.mates(transformedTable);
};
