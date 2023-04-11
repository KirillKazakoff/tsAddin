/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';

export const initInvoiceBlRows: InitInvoicePartT = (utils, invoice) => {
    const { getCell, ws, getRow } = utils;
    const { products } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // prettier-ignore
        const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
        const blArrayCl = getCell(cellName);

        // insert rows
        products.forEach((p, index) => {
            const { record, product } = p;
            const {
                places, placesTotal, price, priceTotal,
            } = record.amount;

            let blCol = '';
            let descCol = '';
            let packCol = '';
            let placesCol = '';
            let placesTotalCol = '';
            let priceUnitCol = '';
            let priceTotalCol = '';

            if (language === 'eng') {
                blCol = record.blNo;
                descCol = product.eng.name;
                packCol = `1/${record.pack} KG`;
                placesCol = `${places.str} PCS/`;
                placesTotalCol = `${placesTotal.str} tn`;
                priceUnitCol = `${price.str} USD`;
                priceTotalCol = `${priceTotal.str} USD`;
            } else {
                blCol = record.blNo;
                descCol = product.ru.name;
                packCol = `1/${record.pack} КГ`;
                placesCol = `${places.str} шт/`;
                placesTotalCol = `${placesTotal.str} тн`;
                priceUnitCol = `${price.str} $`;
                priceTotalCol = `${priceTotal.str} $`;
            }

            const rowArr = [
                blCol,
                descCol,
                packCol,
                placesCol,
                placesTotalCol,
                priceUnitCol,
                priceTotalCol,
            ];

            ws.insertRow(+blArrayCl.row + index, rowArr).commit();
        });

        // style inserted rows
        products.forEach((product, i) => {
            const row = getRow(cellName, -i - 1);
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
    });
};
