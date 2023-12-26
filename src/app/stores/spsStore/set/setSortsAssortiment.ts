import { setSp } from './setSp';

export const setSortsAssortiment = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'sortsAssortiment',
        headers: {
            code: 'Ключ',
            sort: 'Сорт',
            product: 'Продукця',
            weight: 'Вес',
        },
        row: (r) => ({
            code: r.code.toLowerCase(),
            product: r.product,
            sort: r.sort,
            weight: r.weight,
        }),
    });
};
