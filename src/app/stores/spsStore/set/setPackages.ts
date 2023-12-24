/* eslint-disable no-param-reassign */
import { setSp } from './setSp';

export const setPackages = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'packages',
        headers: {
            codeName: 'Ключ',
            vessel: 'Судно',
            production: 'Продукция',
            pack: 'Упаковка',
            coefficient: 'Коэффициент вес',
            fullName: 'Наименование',
        },
        row: (r) => ({
            code: r.codeName,
            coefficient: r.coefficient,
            vessel: r.vessel,
            fullName: r.fullName,
            name: r.production,
            pack: r.pack,
        }),
    });
};
