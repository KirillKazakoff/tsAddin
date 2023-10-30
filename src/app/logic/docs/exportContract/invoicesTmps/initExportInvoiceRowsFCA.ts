import { InvoiceT } from '../groupBy/initInvoice';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';

export const initExportInvoiceRowsFCA = (
    invoice: InvoiceT,
    arrayCl: { row: number; col: number },
    utils: CellUtilsT<''>,
) => {
    const { insertRows, insertRow } = utils.initRowMaker({
        rowIndex: arrayCl.row,
        firstCol: arrayCl.col,
    });

    insertRows({
        deleteStartAmount: 2,
        records: Object.values(invoice.productSortGroups),
        rowSettings: ({ record: r, total }) => {
            const fields = {
                empty1: '',
                bl: '-',
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                empty4: '',
                empty5: '',
                empty6: '',
                empty7: '',
                pack: '-',
                placesTotal: total.placesTotal.count,
                empty10: '',
                price: r.amount.price.count,
                empty12: '',
                priceTotal: r.amount.priceTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportInvoice',
                merge: [{ start: 3, end: 7 }, { start: 9, end: 10 }, { start: 11, end: 12 }],
                style: {
                    common: {
                        height: 50,
                        alignment: 'center',
                        border: 'edges',
                        font: { size: 10 },
                    },
                },
            };
        },
    });

    // prettier-ignore
    insertRow({
        fields: {
            empty1: '',
            empty2: '',
            empty3: '',
            empty4: '',
            empty5: '',
            empty6: '',
            empty7: '',
            totalHeader: 'TOTAL / ВСЕГО',
            placesTotal: invoice.amount.placesTotal.count,
            empty10: '',
            price: '-',
            empty12: '',
            priceTotal: invoice.amount.priceTotal.count,
        },
        merge: [{ start: 9, end: 10 }, { start: 11, end: 12 }],
        docType: 'exportInvoice',
        style: {
            common: {
                height: 50,
                alignment: 'center',
                border: { top: { style: 'thin' } },
                font: { size: 11, bold: true },
            },
            special: {
                totalHeader: { style: { alignment: { horizontal: 'right' } } },
                empty1: { style: { border: { right: { style: 'thin' }, top: {} } } },
                priceTotal: { style: { border: { right: { style: 'thin' } } } },
            },
        },
    });
};
