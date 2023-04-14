/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { InnerRowT } from '../../../../types/typesTables';

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

        row.height = 35;
        row.commit();
    });

    deleteRow(cellName);
};
