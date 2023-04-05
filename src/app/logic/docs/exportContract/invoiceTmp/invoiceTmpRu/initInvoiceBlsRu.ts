/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { styleBlRows } from '../styleInvoiceRows';

export const initInvoiceBlsRu: InitInvoicePartT = (utils, invoice) => {
    const { getCell, ws, getRow } = utils;
    const { products } = invoice;

    const blArrayCl = getCell('Инвойс_Bl_массив_п');

    products.forEach((p, index) => {
        const { record, product } = p;
        const {
            places, placesTotal, price, priceTotal,
        } = record.amount;

        const colBl = record.blNo;
        const colDesc = product.fullName;
        const colPack = `1/${record.pack} КГ`;
        const colPlaces = `${places.str} шт/`;
        const colPlacesTotal = `${placesTotal.str} тн`;
        const colPriceUnit = `${price.str} $`;
        const colPriceTotal = `${priceTotal.str} $`;

        const rowArr = [
            colBl,
            colDesc,
            colPack,
            colPlaces,
            colPlacesTotal,
            colPriceUnit,
            colPriceTotal,
        ];

        console.log(+blArrayCl.row + index);
        ws.insertRow(+blArrayCl.row + index, rowArr).commit();
    });

    styleBlRows(products, getRow, 'Инвойс_Bl_массив_п');
};
