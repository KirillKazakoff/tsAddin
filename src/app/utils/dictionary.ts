import type { ProductDescriptionT } from '../types/types';

type ProductsDictionaryT = {
    [key: string]: ProductDescriptionT;
};

export const productDictionary: ProductsDictionaryT = {
    'сельдь н/р': {
        title: 'Сельдь Т/О жирн.морож. н/р',
        standart: '',
        expirationDate: '',
        pack: '',
    },
    'минтай б/г': {
        title: 'Минтай б/г',
        standart: '',
        expirationDate: '',
        pack: '',
    },
};
