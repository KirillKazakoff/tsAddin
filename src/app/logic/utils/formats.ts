/* eslint-disable no-param-reassign */
import { Cell, Row } from 'exceljs';

// prettier-ignore
export const formats = {
    common: {
        basePlacesTotalTn: '#,##0.0000_)',
        priceDollar: '#,##0.00_) "$"',
        priceRub: '#,##0.00_) "Р"',
        priceDollarUSD: '#,##0.00_) "USD"',
        // priceRub: '_("Р"* #,##0.00_);_("Р"* (#,##0.00);_("Р"* "-"??_);_(@_)',
    },
    ru: {
        places: '# ### "шт"',
        placesTotalKg: '#,##0.00_) "кг"',
        placesTotalTn: '#,##0.0000_) "тн"',
    },
    eng: {
        places: '# ### "PCS"',
        placesTotalKg: '#,##0.00_) "kg"',
        placesTotalTn: '#,##0.0000_) "tn"',
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
        price: formats.common.priceRub,
        priceTotal: formats.common.priceRub,
    },
    sales: {
        places: formats.eng.places,
        placesTotal: formats.eng.placesTotalKg,
        price: formats.common.priceDollar,
        priceTotal: formats.common.priceDollar,
    },
    exportContract: {
        price: formats.common.priceDollar,
        placesTotal: formats.common.basePlacesTotalTn,
    },
};

export type DocTypeT = keyof typeof formatsDocs;

export const setFormats = (
    row: Row,
    fields: { [key: string]: string | number },
    docType: DocTypeT,
) => {
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
