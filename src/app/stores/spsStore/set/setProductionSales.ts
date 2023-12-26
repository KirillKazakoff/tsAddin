import { setSp } from './setSp';

export const setProductionSales = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'productionSales',
        headers: {
            name: 'Product name',
            code: 'ShortName',
            expirationDate: 'Срок годности',
        },
        row: (r) => ({ code: r.code, expirationDate: r.expirationDate, name: r.name }),
    });
};
