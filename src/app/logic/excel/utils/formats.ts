/* eslint-disable no-param-reassign */
import { Cell, Row } from 'exceljs';

// prettier-ignore
export const formats = {
    unique: {
        placesSlash: '# ### "/"',
    },
    common: {
        basePlacesTotalTn: '#,##0.000#_)',
        basePlaces: '# ###',
        priceDollar: '#,##0.00_) "$"',
        priceRub: '#,##0.00_)"руб."',
        priceDollarUSD: '#,##0.00_) "USD"',
        percentage: '0.00%',
    },
    ru: {
        places: '# ### "шт"',
        placesTotalKg: '#,##0.00_) "кг"',
        placesTotalTn: '#,##0.000#_) "тн"',
        priceKg: '#,##0.00_)"р/кг"',
        priceTotal: '#,##0.00_)"р."',
        nds: '0%',
    },
    eng: {
        places: '# ### "PCS"',
        placesTotalKg: '#,##0.00_) "kg"',
        placesTotalTn: '#,##0.000#_) "tn"',
    },
};

type FormatsDocT = Partial<{
    price: number;
    priceTotal: number;
    places: number;
    placesTotal: number;
    placesGross: number;
    pack: number;
}>;

export const formatsDocs = {
    exportInvoice: {
        placesTotal: formats.common.basePlacesTotalTn,
        priceTotal: formats.common.priceDollar,
        price: formats.common.priceDollar,
        places: formats.unique.placesSlash,
    },
    exportContract: {
        price: formats.common.priceDollar,
        placesTotal: formats.common.basePlacesTotalTn,
    },
    exportEng: {
        placesTotal: formats.eng.placesTotalTn,
        placesGross: formats.eng.placesTotalTn,
        places: formats.eng.places,
        price: formats.common.priceDollar,
        priceTotal: formats.common.priceDollarUSD,
    },
    exportRu: {
        places: formats.ru.places,
        placesTotal: formats.ru.placesTotalTn,
        price: formats.common.priceDollar,
        priceTotal: formats.common.priceDollar,
    },
    invoiceKTI: {
        price: formats.common.priceDollar,
        priceTotal: formats.common.priceDollar,
    },
    inner: {
        places: formats.ru.places,
        placesTotal: formats.ru.placesTotalKg,
        price: formats.ru.priceKg,
        priceTotal: formats.ru.priceTotal,
        nds: formats.ru.nds,
    },
    sales: {
        places: formats.eng.places,
        placesTotal: formats.eng.placesTotalKg,
        price: formats.common.priceDollar,
        priceTotal: formats.common.priceDollar,
    },
    assortiment: {
        places: formats.eng.places,
        placesTotal: formats.eng.placesTotalKg,
        percentage: formats.common.percentage,
    },
};

export type DocTypeT = keyof typeof formatsDocs;

export const setFormats = (
    row: Row,
    fields: { [key: string]: string | number },
    docType: DocTypeT,
) => {
    if (!docType) return;

    const cellObj: { [key: string]: Cell } = {};
    const keys = Object.keys(fields);

    row.eachCell((cell, index) => {
        cellObj[keys[index - 1]] = cell;
    });

    const formatsDoc = formatsDocs[docType];

    Object.keys(cellObj).forEach((k) => {
        const key = k as keyof FormatsDocT;
        const cell = cellObj[key];

        if (!cell) return;

        cellObj[key].numFmt = formatsDoc[key];
    });
};
