/* eslint-disable no-param-reassign */
import { Cell, Row } from 'exceljs';
import exportContractStore from '../../../stores/docsStores/exportContractStore';

// prettier-ignore
export const formats = () => {
    const packSp = exportContractStore.currentAgreementRecord?.packSp;

    return {
        unique: {
            placesSlash: '# ### "/"',
            placesBl: `# ### "${packSp?.type}S"`,
            packBl: `#,##0.00_) "${packSp?.type}/KG"`,
            placesTotalBl: '#,##0.0000_) "MTS"',
            placesGrossBl: '#,##0.0000_) "MTS"',
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
            priceTotal: f.common.priceDollar,
            price: f.common.priceDollar,
            places: f.unique.placesSlash,
        },
        exportContract: {
            price: f.common.priceDollar,
            placesTotal: f.common.basePlacesTotalTn,
        },
        exportEng: {
            placesTotal: f.eng.placesTotalTn,
            placesGross: f.eng.placesTotalTn,
            places: f.eng.places,
            price: f.common.priceDollar,
            priceTotal: f.common.priceDollarUSD,
        },
        bl: {
            places: f.unique.placesBl,
            pack: f.unique.packBl,
            placesTotal: f.unique.placesTotalBl,
            placesGross: f.unique.placesGrossBl,
        },
        exportRu: {
            places: f.ru.places,
            placesTotal: f.ru.placesTotalTn,
            price: f.common.priceDollar,
            priceTotal: f.common.priceDollar,
        },
        invoiceKTI: {
            price: f.common.priceDollar,
            priceTotal: f.common.priceDollar,
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
            price: f.common.priceDollar,
            priceTotal: f.common.priceDollar,
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
