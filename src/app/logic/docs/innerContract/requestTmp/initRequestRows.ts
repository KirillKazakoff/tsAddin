/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { InnerRowT } from '../../../../types/typesTables';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';

export const initRequestRows = (rows: InnerRowT[], utils: CellUtilsT) => {
    const {
        ws, getCell, deleteRow, getRow,
    } = utils;
    const cellName = 'Заявка_массив';
    const arrayCl = getCell(cellName);

    rows.forEach((row, index) => {
        const rowArr = [
            row.vessel.ru.name,
            row.product.ru.name,
            row.sort,
            row.product.ru.pack,
            row.amount.placesTotal.str,
            row.amount.price.str,
            row.amount.priceTotal.str,
        ];

        ws.insertRow(+arrayCl.row + index, rowArr).commit();
    });

    rows.forEach((r, i) => {
        const row = getRow(cellName, -i - 1);
        styleRowCells(row, {
            alignment: alignmentCenter,
            height: 45,
            border: borderAll,
        });
    });
    deleteRow(cellName);
};
