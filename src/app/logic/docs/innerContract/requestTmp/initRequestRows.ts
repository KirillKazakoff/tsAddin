/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { InnerRowT } from '../../../../types/typesTables';

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
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' },
            };
            cell.alignment = {
                horizontal: 'center',
                wrapText: true,
                vertical: 'middle',
            };
        });

        row.height = 45;
        row.commit();
    });

    deleteRow(cellName);
};
