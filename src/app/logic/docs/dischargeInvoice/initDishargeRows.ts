// import _ from 'lodash';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { styleRowCells } from '../styleRowCells';
import { DischargeInvoiceT } from './groupInvoiceByNo';

export const initDishargeRows = (invoice: DischargeInvoiceT, utils: CellUtilsT) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const arrayCl = utils.getCell(cellName);
        console.log();

        invoice.rows.forEach((r, i) => {
            const rowArr = [
                '',
                `${r.exportRow.vessel.eng.name} ${r.exportRow.product.eng.name}\n${r.row.amount.placesTotal.str} mt`,
                '',
                '',
                '',
                '',
                '',
                '',
                r.row.amount.price.str,
                '',
                r.row.amount.priceTotal.str,
            ];

            const rowIndex = +arrayCl.row + i;
            // utils.mergeCells({ startCol: 1, endCol: 6, row: rowIndex });
            // utils.ws.mergeCellsWithoutStyle(rowIndex, 1, rowIndex, 5);
            utils.ws.insertRow(rowIndex, rowArr).commit();
            utils.mergeCells({ startCol: 2, endCol: 6, row: rowIndex });
            // styleRow
            const row = utils.ws.getRow(rowIndex);
            styleRowCells(row, {
                height: 40,
                alignment: {
                    wrapText: true,
                },
            });
        });

        utils.deleteRow(cellName);
    });
};
