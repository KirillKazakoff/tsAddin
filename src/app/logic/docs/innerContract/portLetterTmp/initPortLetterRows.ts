/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { InnerRowT } from '../../../../types/typesTables';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';

export const initPortLetterRows = (rows: InnerRowT[], utils: CellUtilsT) => {
    const {
        ws, getCell, deleteRow, getRow,
    } = utils;
    const cellName = 'Письмо_массив';
    const arrayCl = getCell(cellName);

    rows.forEach((row, index) => {
        const rowArr = [
            row.konosament,
            `${row.product.ru.name} ${row.sort}`,
            row.vessel.ru.name,
            `1/${row.pack}`,
            row.amount.places.str,
            row.amount.placesTotal.str,
        ];

        ws.insertRow(+arrayCl.row + index, rowArr).commit();
    });

    rows.forEach((r, i) => {
        const row = getRow(cellName, -i - 1);
        styleRowCells(row, {
            border: borderAll,
            alignment: alignmentCenter,
            height: 35,
        });
    });

    deleteRow(cellName);
};
