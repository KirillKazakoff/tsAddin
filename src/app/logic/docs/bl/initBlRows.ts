import { BlGroupT } from '../../../types/typesContract';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { ExportRowT } from '../../../types/typesTables';
import { setFormats } from '../../utils/formats';
import { alignmentCenter, styleRowCells } from '../styleRowCells';

export const initBlRows = (blGroup: BlGroupT<ExportRowT>, utils: CellUtilsT) => {
    const cellName = 'Bl_массив';
    const arrayCl = utils.getCell(cellName);
    const { groupedProductsArr: rows } = blGroup;

    rows.forEach((r) => {
        const rowArr = [
            // firstEmptyCol
            '',
            r.record.blNo,
            r.record.product.eng.name,
            '-',
            r.record.pack,
            r.total.places.count,
            r.total.placesTotal.count,
            r.total.placesGross.count,
        ];

        const rowIndex = +arrayCl.row + 1;
        utils.ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = utils.ws.getRow(rowIndex);
        const rowObj = {
            places: row.getCell(6),
            placesTotal: row.getCell(7),
            placesGross: row.getCell(8),
        };

        setFormats(rowObj, 'bl');

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
