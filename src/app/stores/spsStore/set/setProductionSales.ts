import { setSp } from './setSp';

export const setProductionSales = (spRange: any[][]) => {
    return setSp({
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

export type ProductionSalesT = ReturnType<typeof setProductionSales>[string];
