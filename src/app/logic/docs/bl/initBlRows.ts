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
        const fields = {
            emptyFirst: '',
            bl: r.record.blNo,
            product: r.record.product.eng.name,
            sort: '-',
            pack: `1/${r.record.pack} KG`,
            places: r.total.places.count,
            placesTotal: r.total.placesTotal.count,
            placesGross: r.total.placesGross.count,
        };

        const rowIndex = +arrayCl.row + 1;
        const row = utils.ws.insertRow(rowIndex, Object.values(fields));

        // styleRow
        setFormats(row, fields, 'exportEng');
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
