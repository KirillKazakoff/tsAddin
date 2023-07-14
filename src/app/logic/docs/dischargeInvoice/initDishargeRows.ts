import { CellUtilsT } from '../../../types/typesExcelUtils';
import { styleRowCells } from '../styleRowCells';
import { DischargeInvoiceT } from './groupInvoiceByNo';

export const initDishargeRows = (invoice: DischargeInvoiceT, utils: CellUtilsT) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const arrayCl = utils.getCell(cellName);

        invoice.rows.forEach((r, i) => {
            const rowArr = [
                '',
                `${r.row.vessel.eng.name} ${r.row.product.eng.name}\n${r.row.amount.placesTotal.str} mt`,
                '',
                r.row.amount.price.str,
                '',
                r.row.amount.priceTotal.str,
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
