import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { formatCount } from '../../utils/formatCount';
import { InvoiceKTIT } from './groupInvoiceKTIByNo';

export const initInvoiceKTIRows = (invoice: InvoiceKTIT, utils: CellUtilsT<''>) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const { insertRows } = utils.initRowMaker({ cellName });

        insertRows({
            records: invoice.rows,
            deleteStartAmount: 1,
            rowSettings: (r, index) => {
                const placesTotal = formatCount(r.row.amount.placesTotal, 3, 4);
                const fields = {
                    empty1: '',
                    description: `${r.exportRow.vessel.eng.name} (${r.exportRow.blNo})\n${r.exportRow.product.eng.name}\n${placesTotal} mt`,
                    empty3: '',
                    empty4: '',
                    empty5: '',
                    empty6: '',
                    days: `${r.row.amount?.days}`,
                    price: r.row.amount.price,
                    priceTotal: r.row.amount.priceTotal,
                };

                if (language === 'ru') {
                    fields.description = `${r.exportRow.vessel.ru.name} (${r.exportRow.blNo})\n${r.exportRow.product.ru.name}\n${placesTotal} тн`;
                }
                if (invoice.type === 'discharge') {
                    delete fields.days;
                }

                const row = utils.ws.getRow(index);
                const fieldsTitles = {
                    desc: utils.getCell('Инвойс_таблица_заголовок').col,
                    days: utils.getCell('Инвойсы_таблица_дни')?.col,
                    price: utils.getCell('Инвойсы_таблица_стоимость').col,
                    priceTotal: utils.getCell('Инвойсы_таблица_сумма').col,
                };
                const rowObj = {
                    desc: row.getCell(2),
                    days:
                        invoice.type === 'storage'
                            ? row.getCell(+fieldsTitles.days)
                            : null,
                    price: row.getCell(+fieldsTitles.price),
                    priceTotal: row.getCell(+fieldsTitles.priceTotal),
                };
                rowObj.desc.style.alignment = { vertical: 'middle', wrapText: true };
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
                        border: {
                            left: { style: 'thin' },
                            right: { style: 'thin' },
                        },
                        alignment: { horizontal: 'center', vertical: 'middle' },
                    };
                }

                // prettier-ignore
                return {
                    fields,
                    docType: 'invoiceKTI',
                    merge: [{ start: 2, end: 6 }],
                    style: {
                        common: {
                            height: invoice.type === 'discharge' ? 45 : 60,
                            alignment: {
                                wrapText: true,
                            },
                        },
                    },
                };
            },
        });
    });
};
