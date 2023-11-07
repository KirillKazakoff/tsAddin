import { InvoiceT } from '../groupBy/initInvoice';
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';

export const initExportInvoiceRows = (
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
                bl: r.blNo,
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                m1: '',
                m2: '',
                m3: '',
                m4: '',
                pack: `1/${r.pack} kg`,
                places: total.places.count,
                placesTotal: total.placesTotal.count,
                price: r.amount.price.count,
                m5: '',
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
                    special: {
                        places: { style: { alignment: { horizontal: 'right' } } },
                        placesTotal: { style: { alignment: { horizontal: 'left' } } },
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
            places: invoice.amount.places.count,
            placesTotal: invoice.amount.placesTotal.count,
            price: '-',
            m1: '',
            priceTotal: invoice.amount.priceTotal.count,
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
                places: { style: { alignment: { horizontal: 'right' } } },
                placesTotal: { style: { alignment: { horizontal: 'left' } } },
                empty1: { style: { border: { right: { style: 'thin' }, top: {} } } },
                priceTotal: { style: { border: { right: { style: 'thin' } } } },
            },
        },
    });
};
