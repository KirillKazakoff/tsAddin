/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { InnerRowT } from '../../../../types/typesTables';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';

export const initPortLetterRows = (rows: InnerRowT[], utils: CellUtilsT) => {
    const { ws } = utils;
    const cellName = 'Письмо_массив';
    const arrayCl = utils.getCell(cellName);

    rows.forEach((r, i) => {
        const rowArr = [
            r.konosament,
            `${r.product.ru.name} ${r.sort}`,
            r.vessel.ru.name,
            `1/${r.pack}`,
            r.amount.places.str,
            r.amount.placesTotal.str,
        ];

        const rowIndex = +arrayCl.row + i;
        ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        styleRowCells(row, {
            border: borderAll,
            alignment: alignmentCenter,
            height: 35,
        });
    });

    utils.deleteRow(cellName);
};
