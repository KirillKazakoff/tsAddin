import { CellUtilsT } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateShort } from '../../excel/utils/getExcelDate';
import type { InvoiceKTIGroupT } from './groupInvoiceKTIByNo';

export const initInvoiceKTIRows = (invoice: InvoiceKTIGroupT, utils: CellUtilsT<''>) => {
    ['eng', 'ru'].forEach((language) => {
        const cellName = language === 'eng' ? 'Инвойс_массив' : 'Инвойс_массив_п';
        const { insertRows, insertRow } = utils.initRowMaker({ cellName });
        const { type } = invoice.record;

        if (type === 'storageInvoicesT') {
            // change header titles on storageInvoice invoice type
            let headersCellName = '';

            const fieldsHeaders = {
                empty1: '',
                desc: 'Description',
                m1: '',
                m2: '',
                m3: '',
                days: 'Days',
                price: 'Cold Storage Charge',
                priceTotal: 'Amount',
            };

            if (language === 'eng') {
                headersCellName = 'Инвойс_таблица_заголовок';
            } else {
                headersCellName = 'Инвойс_таблица_заголовок_п';

                fieldsHeaders.desc = 'Описание';
                fieldsHeaders.days = 'Кол-во дней';
                fieldsHeaders.price = 'Стоимость хранения';
                fieldsHeaders.priceTotal = 'Сумма';
            }

            utils.initRowMaker({ cellName: headersCellName }).insertRow({
                fields: fieldsHeaders,
                style: {
                    common: {
                        alignment: 'center',
                        font: { bold: true },
                        border: {
                            top: { style: 'medium' },
                            bottom: { style: 'medium' },
                        },
                    },
                    special: {
                        days: {
                            style: {
                                border: {
                                    left: { style: 'thin' },
                                    right: { style: 'thin' },
                                },
                            },
                        },
                        price: {
                            style: {
                                border: {
                                    right: { style: 'thin' },
                                },
                            },
                        },
                    },
                },
            });

            utils.deleteRow(headersCellName);
        }

        // insert table rows
        insertRows({
            records: invoice.rows,
            deleteStartAmount: 1,
            rowSettings: (r) => {
                const storagePeriod = type === 'storageInvoicesT'
                    ? ` (${getExcelDateShort(
                        r.row.dateStorageStart,
                        'ru',
                    )}-${getExcelDateShort(r.row.dateStorageEnd, 'ru')})`
                    : '';

                const fields = {
                    empty1: '',
                    description: `${r.exportRow.vessel.eng.name} (${r.exportRow.blNo})\n${r.exportRow.product.eng.name}\n${r.row.amount.placesTotal.str} mt ${storagePeriod}`,
                    m1: '',
                    m2: '',
                    m3: '',
                    m4: '',
                    days: `${r.row?.days}`,
                    price: r.row.amount.price.count,
                    priceTotal: r.row.amount.priceTotal.count,
                };

                if (language === 'ru') {
                    fields.description = `${r.exportRow.vessel.ru.name} (${r.exportRow.blNo})\n${r.exportRow.product.ru.name}\n${r.row.amount.placesTotal.str} тн ${storagePeriod}`;
                }

                if (type === 'dischargeInvoicesT') {
                    delete fields.days;
                }
                if (type === 'storageInvoicesT') {
                    delete fields.m4;
                }

                // prettier-ignore
                return {
                    fields,
                    docType: 'invoiceKTI',
                    style: {
                        common: {
                            height: type === 'dischargeInvoicesT' ? 45 : 60,
                            alignment: { wrapText: true, vertical: 'middle' },
                        },
                        special: {
                            days: {
                                style: {
                                    alignment: { horizontal: 'center' },
                                    border: { left: { style: 'thin' } },
                                },
                            },
                            price: {
                                style: {
                                    alignment: { horizontal: 'center' },
                                    border: { left: { style: 'thin' }, right: { style: 'thin' } },
                                },
                            },
                            priceTotal: {
                                style: { alignment: { horizontal: 'center' } },
                            },
                        },
                    },
                };
            },
        });

        insertRow({
            fields: {
                empty1: '',
                empty2: '',
                empty3: '',
                empty4: '',
                empty5: '',
                empty6: '',
                title: language === 'eng' ? 'TOTAL' : 'ИТОГО',
                priceTotal: invoice.total.priceTotal.count,
            },
            docType: 'invoiceKTI',
            style: {
                common: {
                    font: { bold: true },
                    height: 45,
                    border: { bottom: { style: 'medium' }, top: { style: 'thin' } },
                    alignment: 'center',
                },
                special: {
                    title: { style: { border: { left: { style: 'thin' } } } },
                    priceTotal: { style: { border: { left: { style: 'thin' } } } },
                },
            },
        });
    });
};
