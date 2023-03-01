import type { DictionaryT } from '../types/types';

type ProductsDictionaryT = {
    [key: string]: any;
};

// need to be replaced
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

const eng: DictionaryT = {
    getSubject: (info) => `Offer ${info}`,
    getHeader: (product, vessels, transport, port) => `Dear Sir! Good day! \nWe have discharged ${product} from ${vessels} to ${port} via ${transport}`,
};

const ru: DictionaryT = {
    getSubject: (info) => `Предложение ${info}`,
    getHeader: (product, vessels, transport) => `Направляем информацию по новой партии продукции ${vessels}, ${transport}:`,
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

export const myDictionary: { [key: string]: DictionaryT } = {
    eng,
    ru,
};
