/* eslint-disable no-param-reassign */
import { InitInvoicePartLanguageT } from '../../../../../types/typesExcelUtils';
import { styleBlRows } from '../styleInvoiceRows';

export const initInvoiceBls: InitInvoicePartLanguageT = (
    utils,
    invoice,
    language
) => {
    const { getCell, ws, getRow } = utils;
    const { products } = invoice;

    const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
    const blArrayCl = getCell(cellName);

    products.forEach((p, index) => {
        const { record, product } = p;
        const { places, placesTotal, price, priceTotal } = record.amount;

        let colBl = '',
            colDesc = '',
            colPack = '',
            colPlaces = '',
            colPlacesTotal = '',
            colPriceUnit = '',
            colPriceTotal = '';

        if (language === 'eng') {
            colBl = record.blNo;
            colDesc = product.nameEng;
            colPack = `1/${record.pack} KG`;
            colPlaces = `${places.str} PCS/`;
            colPlacesTotal = `${placesTotal.str} tn`;
            colPriceUnit = `${price.str} USD`;
            colPriceTotal = `${priceTotal.str} USD`;
        } else {
            colBl = record.blNo;
            colDesc = product.fullName;
            colPack = `1/${record.pack} КГ`;
            colPlaces = `${places.str} шт/`;
            colPlacesTotal = `${placesTotal.str} тн`;
            colPriceUnit = `${price.str} $`;
            colPriceTotal = `${priceTotal.str} $`;
        }

        const rowArr = [
            colBl,
            colDesc,
            colPack,
            colPlaces,
            colPlacesTotal,
            colPriceUnit,
            colPriceTotal,
        ];

        ws.insertRow(+blArrayCl.row + index, rowArr).commit();
    });

    styleBlRows(products, getRow, cellName);
};
