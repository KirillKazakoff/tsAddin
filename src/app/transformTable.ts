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
            amount,
            total,
            operation,
        ] = row;

        const rowObj: TableRowT = {
            vessel,
            product: product.toLowerCase(),
            sort,
            pack,
            amount,
            total,
        };

        if (operation !== 'Внутренний рынок') return totalObj;
        totalObj.push(rowObj);
        return totalObj;
    }, []);
};
