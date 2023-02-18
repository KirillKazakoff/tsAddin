/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableRowT } from './types/types';

export const transformTable = (table: any[][]): TableRowT[] => {
    return table.reduce((totalObj, row, index) => {
        if (index === 0) return totalObj;
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

        const rowObj: TableRowT = {
            vessel,
            product: product.toLowerCase(),
            sort,
            amount: amountTotal,
            periodCreation,
        };

        if (operation !== 'Внутренний рынок') return totalObj;
        totalObj.push(rowObj);
        return totalObj;
    }, []);
};
