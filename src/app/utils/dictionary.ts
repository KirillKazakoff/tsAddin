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

const ru = {
    getSubject: (info: string) => `Offer ${info}`,
    getHeader: (product: string, vessels: string, transport: string) => `Dear Sir! Good day! \nWe have discharged ${product} from ${vessels} via ${transport}`,
    product: {
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
    },
};

// const ru: ProductsDictionaryT = {
//     'сельдь н/р': {
//         title: 'Сельдь Т/О жирн.морож. н/р',
//         standart: 'ГОСТ 32910-2014',
//         expirationDate: 'Сроки хранения: 10 месяцев',
//         pack: 'Упаковка – крафт-мешок 1/13 кг (2 блока по 6.5 кг, каждый блок в ПХВ вкладыше)',
//     },
//     'минтай б/г': {
//         title: 'Минтай б/г',
//         standart: 'ГОСТ 32366 - 2013',
//         expirationDate: 'Сроки хранения: 10 месяцев',
//         pack: 'Упаковка – крафт-мешок 1/14 кг (2 блока по 7 кг, каждый блок в ПХВ вкладыше)',
//     },
// };

// const eng: ProductsDictionaryT = {
//     'сельдь н/р': {
//         title: '',
//         pack: 'Packing 1/13 kg',
//     },
//     'минтай б/г': {
//         title: 'MSC Alaska Pollock H/G frozen 20',
//         pack: 'Packing: 1/14 kg',
//     },
//     'мука рыбная': {
//         title: 'Fishmeal',
//         pack: 'Packing: 1/40 kg',
//     },
// };

// export const myDictionary: { [key: string]: ProductsDictionaryT } = {
//     eng,
//     ru,
// };
