import { CellUtilsT } from '../../../types/typesExcelUtils';
import { styleRowCells } from '../styleRowCells';
import { InvoiceKTIT } from './groupInvoiceKTIByNo';

export const initInvoiceKTIRows = (invoice: InvoiceKTIT, utils: CellUtilsT) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const arrayCl = utils.getCell(cellName);

        invoice.rows.forEach((r, i) => {
            const cols = {
                emptyFirst: '',
                description: `${r.exportRow.vessel.eng.name} (${r.exportRow.blNo})\n${r.exportRow.product.eng.name}\n${r.row.amount.placesTotal} mt`,
                emptyMergeFirst: '',
                emptyMergeSecond: '',
                emptyMergeThird: '',
                emptyMergeFourth: '',
                emptyMergeFifth: '',
                days: `${r.row.amount?.days}`,
                emptyIfStorageTmp: '',
                price: `$   ${r.row.amount.price}`,
                emptyBetweenPrices: '',
                priceTotal: `$   ${r.row.amount.priceTotal}`,
            };

            if (language === 'ru') {
                cols.description = `${r.exportRow.vessel.ru.name} (${r.exportRow.blNo})\n${r.exportRow.product.ru.name}\n${r.row.amount.placesTotal} тн`;
            }
            if (invoice.type === 'discharge') {
                delete cols.days;
                delete cols.emptyIfStorageTmp;
            } else {
                delete cols.emptyMergeFifth;
            }

            const rowArr = Object.values(cols);

            const rowIndex = +arrayCl.row + i;
            utils.ws.insertRow(rowIndex, rowArr).commit();

            utils.mergeCells({ startCol: 2, endCol: 6, row: rowIndex });
            // styleRow
            const row = utils.ws.getRow(rowIndex);
            styleRowCells(row, {
                height: invoice.type === 'discharge' ? 45 : 60,
                alignment: {
                    wrapText: true,
                },
            });
            row.getCell(7).border = {
                left: { style: 'thin' },
            };
            if (invoice.type === 'discharge') {
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
            } else {
                row.getCell(7).style = {
                    border: { left: { style: 'thin' }, right: { style: 'thin' } },
                    alignment: { horizontal: 'center', vertical: 'middle' },
                };
                row.getCell(9).style = {
                    alignment: { horizontal: 'right', vertical: 'middle' },
                    border: { right: { style: 'thin' } },
                };
                row.getCell(11).alignment = {
                    horizontal: 'right',
                    vertical: 'middle',
                };
            }
        });

        utils.deleteRow(cellName);
    });
};
