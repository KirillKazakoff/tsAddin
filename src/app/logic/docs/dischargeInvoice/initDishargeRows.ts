import { CellUtilsT } from '../../../types/typesExcelUtils';
import { DischargeInvoiceRowT } from '../../../types/typesTables';
import { styleRowCells } from '../styleRowCells';

export const initDishargeRows = (
    rows: DischargeInvoiceRowT[],
    utils: CellUtilsT,
) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const arrayCl = utils.getCell(cellName);

        rows.forEach((r, i) => {
            const rowArr = [
                '',
                `${r.vessel.eng.name} ${r.product.eng.name}\n${r.amount.placesTotal.str} mt`,
                '',
                r.amount.price.str,
                '',
                r.amount.priceTotal.str,
            ];

            const rowIndex = +arrayCl.row + i;
            utils.ws.insertRow(rowIndex, rowArr).commit();

            // styleRow
            const row = utils.ws.getRow(rowIndex);
            styleRowCells(row, {
                height: 40,
            });
        });

        utils.deleteRow(cellName);
    });
};
