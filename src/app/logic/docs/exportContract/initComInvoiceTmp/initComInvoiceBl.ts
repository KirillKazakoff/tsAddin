/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../types/typesExcelUtils';

export const initComInvoiceBl: InitInvoicePartT = (utils, invoice) => {
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

    // new rows stylization
    products.forEach((product, i) => {
        const row = getRow('Инвойс_Bl_массив', -i - 1);
        row.eachCell((cell) => {
            cell.font = {
                size: 10,
                bold: false,
            };
            cell.alignment = { horizontal: 'center' };
        });

        const amountPlacesCl = row.getCell(4);
        amountPlacesCl.alignment = { horizontal: 'right' };
        row.height = 25;
        row.commit();
    });
};
