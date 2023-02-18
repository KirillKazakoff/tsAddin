import type { ProductDescriptionT } from '../types/types';

type ProductsDictionaryT = {
    [key: string]: ProductDescriptionT;
};

export const productDictionary: ProductsDictionaryT = {
    'сельдь н/р': {
        title: 'Сельдь Т/О жирн.морож. н/р',
        standart: 'ГОСТ 32910-2014',
        expirationDate: 'Сроки хранения: 10 месяцев',
        pack: 'Упаковка – крафт-мешок 1/13 кг (2 блока по 6.5 кг, каждый блок в ПХВ вкладыше)',
    },
    'минтай б/г': {
        title: 'Минтай б/г',
        standart: 'ГОСТ 32366 - 2013',
        expirationDate: 'Сроки хранения: 10 месяцев',
        pack: 'Упаковка – крафт-мешок 1/14 кг (2 блока по 7 кг, каждый блок в ПХВ вкладыше)',
    },
};
