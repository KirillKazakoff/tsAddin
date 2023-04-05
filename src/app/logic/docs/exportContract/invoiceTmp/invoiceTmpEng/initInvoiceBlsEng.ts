/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { styleBlRows } from '../styleInvoiceRows';

export const initInvoiceBlsEng: InitInvoicePartT = (utils, invoice) => {
    const { getCell, ws, getRow } = utils;
    const { products } = invoice;

    const blArrayCl = getCell('Инвойс_Bl_массив');

    products.forEach((p, index) => {
        const { record, product } = p;
        const {
            places, placesTotal, price, priceTotal,
        } = record.amount;

        const colBl = record.blNo;
        const colDesc = product.nameEng;
        const colPack = `1/${record.pack} KG`;
        const colPlaces = `${places.str} PCS/`;
        const colPlacesTotal = `${placesTotal.str} tn`;
        const colPriceUnit = `${price.str} USD`;
        const colPriceTotal = `${priceTotal.str} USD`;

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

    styleBlRows(products, getRow);
};
