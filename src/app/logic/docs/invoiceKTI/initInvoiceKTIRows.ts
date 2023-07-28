import { CellUtilsT } from '../../../types/typesExcelUtils';
import { formats } from '../../utils/constants';
import { formatCount } from '../../utils/formatCount';
import { styleRowCells } from '../styleRowCells';
import { InvoiceKTIT } from './groupInvoiceKTIByNo';

export const initInvoiceKTIRows = (invoice: InvoiceKTIT, utils: CellUtilsT) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const arrayCl = utils.getCell(cellName);

        invoice.rows.forEach((r, i) => {
            const placesTotal = formatCount(r.row.amount.placesTotal, 3, 4);
            const cols = {
                emptyFirst: '',
                description: `${r.exportRow.vessel.eng.name} (${r.exportRow.blNo})\n${r.exportRow.product.eng.name}\n${placesTotal} mt`,
                emptyMergeFirst: '',
                emptyMergeSecond: '',
                emptyMergeThird: '',
                emptyMergeFourth: '',
                days: `${r.row.amount?.days}`,
                price: r.row.amount.price,
                priceTotal: r.row.amount.priceTotal,
            };

            if (language === 'ru') {
                cols.description = `${r.exportRow.vessel.ru.name} (${r.exportRow.blNo})\n${r.exportRow.product.ru.name}\n${placesTotal} тн`;
            }
            if (invoice.type === 'discharge') {
                delete cols.days;
            }

            const rowArr = Object.values(cols);
            const rowIndex = +arrayCl.row + i;
            utils.ws.insertRow(rowIndex, rowArr).commit();
            utils.mergeCells({ startCol: 2, endCol: 6, row: rowIndex });

            // styling
            const row = utils.ws.getRow(rowIndex);
            styleRowCells(row, {
                height: invoice.type === 'discharge' ? 45 : 60,
                alignment: {
                    wrapText: true,
                },
            });
            const colsHeader = {
                desc: utils.getCell('Инвойс_таблица_заголовок').col,
                days: utils.getCell('Инвойсы_таблица_дни')?.col,
                price: utils.getCell('Инвойсы_таблица_стоимость').col,
                priceTotal: utils.getCell('Инвойсы_таблица_сумма').col,
            };
            const rowObj = {
                desc: row.getCell(2),
                days:
                    invoice.type === 'storage'
                        ? row.getCell(+colsHeader.days)
                        : null,
                price: row.getCell(+colsHeader.price),
                priceTotal: row.getCell(+colsHeader.priceTotal),
            };
            rowObj.desc.style.alignment = { vertical: 'middle' };
            rowObj.price.style = {
                border: { right: { style: 'thin' }, left: { style: 'thin' } },
                alignment: { horizontal: 'right', vertical: 'middle' },
            };
            rowObj.priceTotal.alignment = {
                horizontal: 'right',
                vertical: 'middle',
            };
            if (invoice.type === 'storage') {
                rowObj.days.style = {
                    border: { left: { style: 'thin' }, right: { style: 'thin' } },
                    alignment: { horizontal: 'center', vertical: 'middle' },
                };
            }
            // format
            rowObj.price.numFmt = formats.priceDollar;
            rowObj.priceTotal.numFmt = formats.priceDollar;
        });

        utils.deleteRow(cellName);
    });
};
