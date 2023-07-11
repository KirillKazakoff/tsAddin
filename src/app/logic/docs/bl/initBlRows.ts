import { BlGroupT } from '../../../types/typesContract';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { alignmentCenter, styleRowCells } from '../styleRowCells';

export const initBlRows = (blGroup: BlGroupT, utils: CellUtilsT) => {
    const cellName = 'Bl_массив';
    const arrayCl = utils.getCell(cellName);
    const { ws } = utils;
    const { record, total } = blGroup;

    const rowArr = [
        // firstEmptyCol
        '',
        record.blNo,
        record.product.eng.name,
        '',
        `1/${record.pack} KG`,
        `${total.places.str}`,
        `${total.placesTotal.str}`,
        `${total.placesGross.str}`,
    ];

    const rowIndex = +arrayCl.row + 1;
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

    utils.deleteRow(cellName);
};
