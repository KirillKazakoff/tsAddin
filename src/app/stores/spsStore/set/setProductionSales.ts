import { setSp } from './setSp';

export const setProductionSales = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        type: 'productionSales',
        headers: {
            name: 'Product name',
            code: 'Short name',
        },
        row: (r) => ({ code: r.code, name: r.name }),
    });
};

export type ProductionSalesT = ReturnType<typeof setProductionSales>[string];
