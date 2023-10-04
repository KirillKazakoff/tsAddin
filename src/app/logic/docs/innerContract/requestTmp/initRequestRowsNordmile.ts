/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { NordmileRowT } from '../../../../types/typesTables';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';
import { setFormats } from '../../../utils/formats';

export const initRequestRowsNordmile = (rows: NordmileRowT[], utils: CellUtilsT) => {
    const { ws } = utils;
    const cellName = 'Заявка_массив';
    const arrayCl = utils.getCell(cellName);

    rows.forEach((r, i) => {
        const rowArr = [
            r.producer,
            r.product,
            r.pack,
            r.amount.placesTotal.str,
            r.amount.price.str,
            r.amount.priceTotal.str,
        ];

        const fields = {
            vessel: r.producer,
            product: r.product,
            pack: r.pack.pack,
            placesTotal: r.amount.placesTotal.str,
            price: r.amount.price.str,
            priceTotal: r.amount.priceTotal.str,
        };

        const rowIndex = +arrayCl.row + i;
        ws.insertRow(rowIndex, rowArr).commit();

        // styleRow
        const row = ws.getRow(rowIndex);
        setFormats(row, fields, 'inner');

        styleRowCells(row, {
            alignment: alignmentCenter,
            height: 45,
            border: borderAll,
        });
    });

    utils.deleteRow(cellName);
};
