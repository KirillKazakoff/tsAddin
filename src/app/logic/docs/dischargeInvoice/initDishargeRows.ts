// import _ from 'lodash';
import { CellUtilsT } from '../../../types/typesExcelUtils';
import { styleRowCells } from '../styleRowCells';
import { DischargeInvoiceT } from './groupInvoiceByNo';

export const initDishargeRows = (invoice: DischargeInvoiceT, utils: CellUtilsT) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const arrayCl = utils.getCell(cellName);

        invoice.rows.forEach((r, i) => {
            const cols = {
                emptyFirst: '',
                description: `${r.exportRow.vessel.eng.name} (${r.exportRow.blNo})\n${r.exportRow.product.eng.name}\n${r.row.amount.placesTotal.str} mt`,
                emptyMergeFirst: '',
                emptyMergeSecond: '',
                emptyMergeThird: '',
                emptyMergeFourth: '',
                emptyMergeFifth: '',
                price: `$   ${r.row.amount.price.str}`,
                emptyBetweenPrices: '',
                priceTotal: `$   ${r.row.amount.priceTotal.str}`,
            };

            if (language === 'ru') {
                cols.description = `${r.exportRow.vessel.ru.name} (${r.exportRow.blNo})\n${r.exportRow.product.ru.name}\n${r.row.amount.placesTotal.str} тн`;
            }

            const rowArr = Object.values(cols);

            const rowIndex = +arrayCl.row + i;
            utils.ws.insertRow(rowIndex, rowArr).commit();

            utils.mergeCells({ startCol: 2, endCol: 6, row: rowIndex });
            // styleRow
            const row = utils.ws.getRow(rowIndex);
            styleRowCells(row, {
                height: 45,
                alignment: {
                    wrapText: true,
                },
            });
            row.getCell(7).border = {
                left: { style: 'thin' },
            };
            row.getCell(8).alignment = {
                horizontal: 'right',
                vertical: 'middle',
            };
            row.getCell(9).border = {
                left: { style: 'thin' },
            };
            row.getCell(10).alignment = {
                horizontal: 'right',
                vertical: 'middle',
            };
        });

        utils.deleteRow(cellName);
    });
};
