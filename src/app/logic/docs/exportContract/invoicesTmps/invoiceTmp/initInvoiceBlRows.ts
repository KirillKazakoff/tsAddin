/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { alignmentCenter, fontDefault, styleRowCells } from '../../../styleRowCells';

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

            // there are two empty cols implemented for borders
            // in excel template (merge removes borders in cells)
            const cols = {
                emptyFirst: '',
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

            if (ws.name.includes('Noncom')) delete cols.vessel;
            const rowArr = Object.values(cols);

            ws.insertRow(+blArrayCl.row + index, rowArr).commit();
        });

        // style inserted rows
        rows.forEach((product, i) => {
            const row = getRow(cellName, -i - 1);

            styleRowCells(row, {
                height: 30,
                alignment: alignmentCenter,
                font: fontDefault,
            });

            row.getCell(2).border = {
                left: { style: 'thin' },
            };
            row.getCell(row.actualCellCount).border = {
                right: { style: 'thin' },
            };
        });
    });
};
