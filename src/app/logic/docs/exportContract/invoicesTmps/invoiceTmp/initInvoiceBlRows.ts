/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';

export const initInvoiceBlRows: InitInvoicePartT = (utils, invoice) => {
    const { getCell, ws, getRow } = utils;
    const { rows } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // prettier-ignore
        const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
        const blArrayCl = getCell(cellName);

        // insert rows
        rows.forEach((row, index) => {
            const {
                places, placesTotal, price, priceTotal,
            } = row.amount;

            const cols = {
                bl: row.blNo,
                vessel: row.vessel.eng.name,
                desc: row.product.eng.name,
                pack: `1/${row.pack} KG`,
                places: `${places.str} PCS/`,
                placesTotal: `${placesTotal.str} tn`,
                priceUnit: `${price.str} USD`,
                priceTotal: `${priceTotal.str} USD`,
            };

            if (language === 'ru') {
                cols.desc = row.product.ru.name;
                cols.vessel = row.vessel.ru.name;
                cols.pack = `1/${row.pack} КГ`;
                cols.places = `${places.str} шт/`;
                cols.placesTotal = `${placesTotal.str} тн`;
                cols.priceUnit = `${price.str} $`;
                cols.priceTotal = `${priceTotal.str} $`;
            }

            const rowArr = Object.values(cols);

            ws.insertRow(+blArrayCl.row + index, rowArr).commit();
        });

        // style inserted rows
        rows.forEach((product, i) => {
            const row = getRow(cellName, -i - 1);
            row.eachCell((cell) => {
                cell.font = {
                    size: 10,
                    bold: false,
                };
                cell.alignment = {
                    horizontal: 'center',
                    wrapText: true,
                    vertical: 'middle',
                };
            });

            const amountPlacesCl = row.getCell(5);
            amountPlacesCl.alignment = { horizontal: 'right', vertical: 'middle' };
            row.height = 30;
            row.commit();
        });
    });
};
