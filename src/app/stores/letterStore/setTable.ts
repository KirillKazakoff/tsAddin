/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableRowT } from '../../types/types';
import pageStatusStore from '../pageStatusStore';
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
            operation,
            vessel,
            product: product.toLowerCase(),
            sort,
            amount: amountTotal,
            periodCreation,
        };

        if (!operation || !vessel || !product) {
            pageStatusStore.setLetterStatus(true);
        }
        if (operation === 'Образец') return totalObj;

        totalObj.push(rowObj);
        return totalObj;
    }, []);

    letterStore.setTable(transformedTable);
};
