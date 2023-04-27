import { CellUtilsT } from '../../../types/typesExcelUtils';
import { ExportRowT } from '../../../types/typesTables';
import { alignmentCenter, styleRowCells } from '../styleRowCells';

export const initBlRows = (rows: ExportRowT[], utils: CellUtilsT) => {
    const cellName = 'Bl_массив';
    const arrayCl = utils.getCell(cellName);
    const { ws } = utils;

    rows.forEach((r, i) => {
        const rowArr = [
            // firstEmptyCol
            '',
            r.blNo,
            r.product.eng.name,
            r.sort,
            `1/${r.pack} KG`,
            `${r.amount.places.str} PCS /`,
            `${r.amount.placesTotal.str} tn`,
        ];

        const rowIndex = +arrayCl.row + i;
        utils.ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        styleRowCells(row, {
            alignment: alignmentCenter,
            height: 40,
        });
        row.getCell(2).border = {
            left: { style: 'thin' },
        };
        row.getCell(row.actualCellCount).border = {
            right: { style: 'thin' },
        };
    });

    utils.deleteRow(cellName);
};
