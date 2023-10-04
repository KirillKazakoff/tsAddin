/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../types/typesExcelUtils';
import { setFormats } from '../../../utils/formats';
import { alignmentCenter, borderAll, styleRowCells } from '../../styleRowCells';
import { RequestT } from '../groupContractByNameSort';

export const initRequestRows = (requests: RequestT[], utils: CellUtilsT) => {
    const cellName = 'Заявка_массив';
    const arrayCl = utils.getCell(cellName);

    requests.forEach((r, i) => {
        const { record, amountTotal } = r;

        const fields = {
            vessel: record.vessel.ru.name,
            product: record.product.ru.name,
            sort: record.sort,
            pack: record.product.ru.pack,
            placesTotal: amountTotal.count,
            price: record.amount.price.count,
            priceTotal: record.amount.priceTotal.count,
        };

        const rowIndex = +arrayCl.row + i;
        utils.ws.insertRow(rowIndex, Object.values(fields)).commit();

        // styleRow
        const row = utils.ws.getRow(rowIndex);

        setFormats(row, fields, 'inner');

        styleRowCells(row, {
            alignment: alignmentCenter,
            height: 55,
            border: borderAll,
        });
    });

    utils.deleteRow(cellName);
};
