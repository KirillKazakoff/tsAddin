/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';
import { RequestT } from '../groupContractByNameSort';

export const initRequestRows = (requests: RequestT[], utils: CellUtilsT) => {
    const { ws } = utils;
    const cellName = 'Заявка_массив';
    const arrayCl = utils.getCell(cellName);

    requests.forEach((r, i) => {
        const { record, amountTotal, priceTotal } = r;
        const rowArr = [
            record.vessel.ru.name,
            record.product.ru.name,
            record.sort,
            record.product.ru.pack,
            amountTotal.str,
            record.amount.price.str,
            priceTotal.str,
        ];

        const rowIndex = +arrayCl.row + i;
        ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        styleRowCells(row, {
            alignment: alignmentCenter,
            height: 55,
            border: borderAll,
        });
    });

    utils.deleteRow(cellName);
};
