/* eslint-disable no-param-reassign */
import { Cell } from 'exceljs';

export const formats = {
    common: {
        priceDollar: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
        priceRub: '_("Р"* #,##0.00_);_("Р"* (#,##0.00);_("Р"* "-"??_);_(@_)',
    },
    ru: {
        pack: '"1/" # ### "кг"',
        places: '# ### "шт"',
        placesTotalKg: '# ###.00 кг',
        placesTotalTn: '# ###.0000 "тн"',
    },
    eng: {
        pack: '"1/" # ### "kg"',
        places: '# ### "PCS"',
        placesTotalKg: '# ###.00 kg',
        placesTotalTn: '# ###.0000 "tn"',
    },
};

type FormatsDocT = Partial<{
    price: string;
    priceTotal: string;
    places: string;
    placesTotal: string;
    pack: string;
}>;

type PropsT = keyof { [P in keyof FormatsDocT] };

export const formatsDocs = {
    bl: {
        placesTotal: formats.eng.placesTotalTn,
        placesGross: formats.eng.placesTotalTn,
        places: formats.eng.places,
        price: formats.common.priceDollar,
        pack: formats.eng.pack,
    },
    sales: {
        placesTotal: formats.eng.placesTotalKg,
    },
    invoiceKTI: {
        price: formats.common.priceDollar,
        priceTotal: formats.common.priceDollar,
    },
};

export const setFormats = (
    cellObj: Partial<{ [P in PropsT]: Cell }> & unknown,
    docType: string,
) => {
    const formatsDoc = formatsDocs[docType];

    Object.keys(cellObj).forEach((k) => {
        const key = k as PropsT;
        cellObj[key].numFmt = formatsDoc[key];
    });
};
