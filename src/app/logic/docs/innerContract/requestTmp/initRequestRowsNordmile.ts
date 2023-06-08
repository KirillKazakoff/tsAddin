/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { NordmileRowT } from '../../../../types/typesTables';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';

export const initRequestRowsNordmile = (rows: NordmileRowT[], utils: CellUtilsT) => {
    const { ws } = utils;
    const cellName = 'Заявка_массив';
    const arrayCl = utils.getCell(cellName);

    rows.forEach((r, i) => {
        const rowArr = [
            r.producer,
            r.product,
            r.pack,
            r.amount.placesTotal.str,
            r.amount.price.str,
            r.amount.priceTotal.str,
        ];

        const rowIndex = +arrayCl.row + i;
        ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        styleRowCells(row, {
            alignment: alignmentCenter,
            height: 45,
            border: borderAll,
        });
    });

    utils.deleteRow(cellName);
};
