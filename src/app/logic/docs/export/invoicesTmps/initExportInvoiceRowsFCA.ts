import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../groupAgByNo';

export const initExportInvoiceRowsFCA = (
    invoice: ExportGroupT,
    arrayCl: { row: number; col: number },
    utils: CellUtilsT<''>,
) => {
    const { insertRows, insertRow } = utils.initRowMaker({
        rowIndex: arrayCl.row,
        firstCol: arrayCl.col,
    });

    insertRows({
        deleteStartAmount: 2,
        records: invoice.groupedBy.productSort,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                empty1: '',
                bl: r.portTo.code === 'Зарубино' ? '-' : r.blNo,
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                m1: '',
                m2: '',
                m3: '',
                m4: '',
                pack: '-',
                placesTotal: total.placesTotal.count,
                m5: '',
                price: r.amount.price.count,
                m6: '',
                priceTotal: total.priceTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportInvoice',
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
            placesTotal: invoice.total.placesTotal.count,
            m1: '',
            price: '-',
            m2: '',
            priceTotal: invoice.total.priceTotal.count,
        },
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
