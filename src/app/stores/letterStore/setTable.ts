/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableRowT } from '../../types/types';
import letterStore from './letterStore';

export const setTable = (table: any[][]) => {
    const transformedTable = table.reduce((totalObj, row, index) => {
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

        if (
            operation !== 'Внутренний рынок'
            && operation !== 'Хранение на экспорт'
        ) {
            return totalObj;
        }

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    letterStore.setTable(transformedTable);
};
