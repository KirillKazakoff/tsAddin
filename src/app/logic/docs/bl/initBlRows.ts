import { BlGroupT } from '../../../types/typesContract';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { ExportRowT } from '../../../types/typesTables';
import { alignmentCenter, styleRowCells } from '../styleRowCells';

export const initBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT) => {
    const cellName = 'Bl_массив';
    const arrayCl = utils.getCell(cellName);
    const { rows } = blGroup;

    rows.forEach((r) => {
        const rowArr = [
            // firstEmptyCol
            '',
            r.record.blNo,
            r.record.product.eng.name,
            '-',
            `1/${r.record.pack} KG`,
            `${r.total.places.str} PCS`,
            `${r.total.placesTotal.str} tn`,
            `${r.total.placesGross.str} tn`,
        ];

        const rowIndex = +arrayCl.row + 1;
        utils.ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = utils.ws.getRow(rowIndex);
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
    });

    utils.deleteRow(cellName);
};
