/* eslint-disable no-param-reassign */
import { Cell, Row } from 'exceljs';

export const formats = () => {
    return {
        unique: {
            placesSlash: '# ### "/"',
        },
        common: {
            basePlacesTotalTn: '#,##0.000#_)',
            basePlaces: '# ###',
            price: {
                rub: '#,##0.00_)"руб."',
                dollar: '#,##0.00_) "USD"',
                uan: '#,##0.00_) "CNY"',
            },
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
};

type FormatsDocT = Partial<{
    price: number;
    priceTotal: number;
    places: number;
    placesTotal: number;
    placesGross: number;
    pack: number;
}>;

const formatsDocs = () => {
    const f = formats();

    return {
        exportInvoice: {
            placesTotal: f.common.basePlacesTotalTn,
            priceTotal: f.common.price.dollar,
            price: f.common.price.dollar,
            places: f.unique.placesSlash,
        },
        exportContract: {
            price: f.common.price.dollar,
            placesTotal: f.common.basePlacesTotalTn,
        },
        exportEng: {
            placesTotal: f.eng.placesTotalTn,
            placesGross: f.eng.placesTotalTn,
            places: f.eng.places,
            price: f.common.price.dollar,
            priceTotal: f.common.price.dollar,
        },
        exportRu: {
            places: f.ru.places,
            placesTotal: f.ru.placesTotalTn,
            price: f.common.price.dollar,
            priceTotal: f.common.price.dollar,
        },
        invoiceKTI: {
            price: f.common.price.dollar,
            priceTotal: f.common.price.dollar,
        },
        inner: {
            places: f.ru.places,
            placesTotal: f.ru.placesTotalKg,
            price: f.ru.priceKg,
            priceTotal: f.ru.priceTotal,
            nds: f.ru.nds,
        },
        sales: {
            places: f.eng.places,
            placesTotal: f.eng.placesTotalKg,
            price: f.common.price.dollar,
            priceTotal: f.common.price.dollar,
        },
        assortiment: {
            places: f.eng.places,
            placesTotal: f.eng.placesTotalKg,
            percentage: f.common.percentage,
        },
    };
};

export type DocTypeT = keyof ReturnType<typeof formatsDocs>;

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

    const formatsDoc = formatsDocs()[docType];

    Object.keys(cellObj).forEach((k) => {
        const key = k as keyof FormatsDocT;
        const cell = cellObj[key];

        if (!cell) return;

        cellObj[key].numFmt = formatsDoc[key];
    });
};

export const setDynamicFormats = (
    fields: { [key: string]: string | number },
    dynamicFormats: { [key: string]: string },
    row: Row,
) => {
    if (!dynamicFormats) return;

    const cellObj: { [key: string]: Cell } = {};
    const keys = Object.keys(fields);

    row.eachCell((cell, index) => {
        cellObj[keys[index - 1]] = cell;
    });

    Object.keys(dynamicFormats).forEach((k) => {
        const key = k as keyof FormatsDocT;
        const cell = cellObj[key];

        if (!cell) return;

        cellObj[key].numFmt = dynamicFormats[key];
    });
};
