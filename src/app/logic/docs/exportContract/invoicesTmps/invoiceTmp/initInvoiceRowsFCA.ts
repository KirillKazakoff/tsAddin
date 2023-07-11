import { InitInvoicePartT } from '../../../../../types/typesExcelUtils';
import { styleRowCells, alignmentCenter, fontDefault } from '../../../styleRowCells';

export const initInvoiceRowsFCA: InitInvoicePartT = (utils, invoice) => {
    // initRows
    const { ws } = utils;
    const { productGroups } = invoice;

    ['eng', 'ru'].forEach((language) => {
        // initTitles
        const cellName = language === 'eng' ? 'Инвойс_Bl_массив' : 'Инвойс_Bl_массив_п';
        const titlesRow = utils.getRow(cellName, -1);

        const descCl = { startCol: 1, endCol: 4, row: titlesRow.number };
        const placesCl = { startCol: 5, endCol: 6, row: titlesRow.number };
        utils.mergeCells(descCl);
        utils.mergeCells(placesCl);

        // insert rows
        const arrayCl = utils.getCell(cellName);
        Object.values(productGroups).forEach((group, i) => {
            const r = group.record;
            const { placesTotal, priceTotal } = group.total;
            const { price } = r.amount;

            // there are two empty cols implemented for borders
            // in excel template (merge removes borders in cells)
            const cols = {
                emptyFirst: '',
                desc: r.product.eng.name,
                placesTotal: ` ${placesTotal.str} tn`,
                priceUnit: `${price.str} USD`,
                priceTotal: `${priceTotal.str} USD`,
            };

            if (language === 'ru') {
                cols.desc = r.product.ru.name;
                cols.placesTotal = ` ${placesTotal.str} тн`;
                cols.priceUnit = `${price.str} $`;
                cols.priceTotal = `${priceTotal.str} $`;
            }

            // mergeRowCells
            const rowArr = Object.values(cols);
            const rowIndex = +arrayCl.row + i;
            utils.mergeCells({ startCol: 1, endCol: 4, row: rowIndex });
            utils.mergeCells({ startCol: 5, endCol: 6, row: rowIndex });

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
        });
    });
};
