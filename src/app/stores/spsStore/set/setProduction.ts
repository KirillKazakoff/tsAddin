/* eslint-disable no-param-reassign */
import { setSp } from './setSp';

export const setProduction = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'production',
        headers: {
            fullNameRu: 'Наименование',
            fullNameEng: 'Product name',
            code: 'Короткое наименование',
            expirationDate: 'Срок годности',
            packRu: 'Упаковка',
            packEng: 'Упаковка (eng)',
            standart: 'Стандарт',
            codeNew: 'Код',
        },
        row: (r) => ({
            code: r.code.toLowerCase(),
            eng: {
                name: r.fullNameEng,
                pack: r.packEng || 'No package',
            },
            ru: {
                name: r.fullNameRu,
                pack: r.packRu || 'Нет упаковки',
            },
            expirationDate: r.expirationDate || 'ХХХ',
            standart: r.standart || 'Нет стандарта',
        }),
    });
};
