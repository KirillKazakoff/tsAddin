/* eslint-disable no-param-reassign */
import {
    InitInvoicePartLanguageT,
    InitInvoicePartT,
} from '../../../../../types/typesExcelUtils';
import { styleInvoiceBlRows } from './styleInvoiceBlRows';

export const initInvoiceBlRows: InitInvoicePartT = (utils, invoice) => {
    const { getCell, ws, getRow } = utils;
    const { products } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // prettier-ignore
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
                colDesc = product.eng.name;
                colPack = `1/${record.pack} KG`;
                colPlaces = `${places.str} PCS/`;
                colPlacesTotal = `${placesTotal.str} tn`;
                colPriceUnit = `${price.str} USD`;
                colPriceTotal = `${priceTotal.str} USD`;
            } else {
                colBl = record.blNo;
                colDesc = product.ru.name;
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

        styleInvoiceBlRows(products, getRow, cellName);
    });
};
