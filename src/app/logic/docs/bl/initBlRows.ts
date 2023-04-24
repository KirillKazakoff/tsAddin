import { CellUtilsT } from '../../../types/typesExcelUtils';
import { ExportRowT } from '../../../types/typesTables';
import { alignmentCenter, styleRowCells } from '../styleRowCells';

export const initBlRows = (rows: ExportRowT[], utils: CellUtilsT) => {
    const cellName = 'Bl_массив';
    const arrayCl = utils.getCell(cellName);

    rows.forEach((row, index) => {
        const rowArr = [
            // firstEmptyCol ('')
            '',
            row.blNo,
            row.product.eng.name,
            row.sort,
            `1/${row.pack} KG`,
            `${row.amount.places.str} PCS /`,
            `${row.amount.placesTotal.str} tn`,
        ];

        utils.ws.insertRow(+arrayCl.row + index, rowArr).commit();
    });

    rows.forEach((r, i) => {
        const row = utils.getRow(cellName, -i - 1);
        styleRowCells(row, {
            alignment: alignmentCenter,
            height: 45,
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
