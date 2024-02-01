export const currenciesSp = {
    CNY: {
        key: 'CNY',
        symbol: '¥',
        ru: {
            padezh: {
                thinkAbout: 'юанях',
                seeWhat: ['юань', 'юаня', 'юаней'],
            },
            decimals: 'фэней',
            country: 'КНР',
        },
        eng: {
            country: 'PRC',
            name: 'yuan',
            decimals: 'fens',
        },
    },
    RUB: {
        key: 'RUB',
        symbol: '₽',
        ru: {
            padezh: {
                thinkAbout: 'рублях',
                seeWhat: ['рубль', 'рубля', 'рублей'],
            },
            decimals: 'копеек',
        },
        eng: {
            country: 'RU',
            name: 'ruble',
            decimals: 'kopecks',
        },
    },
    USD: {
        key: 'USD',
        symbol: '$',
        ru: {
            padezh: {
                thinkAbout: 'долларах США',
                seeWhat: ['доллар США', 'доллара США', 'долларов США'],
            },
            decimals: 'центов',
            country: 'РФ',
        },
        eng: {
            decimals: 'cents',
            name: 'US dollar',
            country: 'US',
        },
    },
};

export type CurrencyT = (typeof currenciesSp)['CNY'];
