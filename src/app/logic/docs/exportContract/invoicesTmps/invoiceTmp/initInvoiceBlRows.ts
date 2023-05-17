/* eslint-disable no-param-reassign */
import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { alignmentCenter, fontDefault, styleRowCells } from '../../../styleRowCells';

export const initInvoiceBlRows: InitInvoicePartT = (utils, invoice) => {
    const { ws } = utils;
    const { productGroups } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // prettier-ignore
        const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
        const arrayCl = utils.getCell(cellName);

        // insert rows
        Object.values(productGroups).forEach((group, i) => {
            const r = group.record;
            const { places, placesTotal, priceTotal } = group.total;

            const { price } = r.amount;

            // there are two empty cols implemented for borders
            // in excel template (merge removes borders in cells)
            const cols = {
                emptyFirst: '',
                bl: r.blNo,
                vessel: r.vessel.eng.name,
                desc: r.product.eng.name,
                pack: `1/${r.pack} KG`,
                places: `${places.str} PCS /`,
                placesTotal: ` ${placesTotal.str} tn`,
                priceUnit: `${price.str} USD`,
                priceTotal: `${priceTotal.str} USD`,
            };

            if (language === 'ru') {
                cols.desc = r.product.ru.name;
                cols.vessel = r.vessel.ru.name;
                cols.pack = `1/${r.pack} КГ`;
                cols.places = `${places.str} мест /`;
                cols.placesTotal = ` ${placesTotal.str} тн`;
                cols.priceUnit = `${price.str} $`;
                cols.priceTotal = `${priceTotal.str} $`;
            }

            let amountCellCount = 6;
            if (ws.name.includes('Noncom')) {
                delete cols.vessel;
                amountCellCount = 5;
            }
            const rowArr = Object.values(cols);

            const rowIndex = +arrayCl.row + i;
            ws.insertRow(rowIndex, rowArr).commit();

            // styleRow
            const row = ws.getRow(rowIndex);

            styleRowCells(row, {
                height: 30,
                alignment: alignmentCenter,
                font: fontDefault,
            });
            // styleEndAndStartBorders
            row.getCell(2).border = {
                left: { style: 'thin' },
            };
            row.getCell(row.actualCellCount).border = {
                right: { style: 'thin' },
            };
            // styleAmountCells
            row.getCell(amountCellCount).style.alignment = {
                vertical: 'middle',
                horizontal: 'right',
            };
            row.getCell(amountCellCount + 1).style.alignment = {
                vertical: 'middle',
                horizontal: 'left',
            };
        });
    });
};
