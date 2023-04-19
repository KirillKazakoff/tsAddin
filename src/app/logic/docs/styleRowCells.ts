/* eslint-disable no-param-reassign */
import { Row } from 'exceljs';

export const styleRowCells = (row: Row, rowHeight: number) => {
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

    row.height = rowHeight;
    row.commit();
};
