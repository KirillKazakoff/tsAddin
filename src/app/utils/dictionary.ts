type ProductDictionaryT = {
    [key: string]: {
        title: string;
        desc: string;
    };
};

export const productDictionary: ProductDictionaryT = {
    'сельдь н/р': {
        title: 'Сельдь Т/О жирн.морож. н/р',
        desc: 'seld description',
    },
    'минтай б/г': {
        title: 'Минтай б/г',
        desc: 'mintay description',
    },
};
