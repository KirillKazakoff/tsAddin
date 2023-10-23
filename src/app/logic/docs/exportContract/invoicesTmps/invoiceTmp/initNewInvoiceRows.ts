import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { initRowMaker } from '../../../../excel/utils/excelUtilsObj/initRows';
import { InvoiceT } from '../../groupBy/initInvoice';

export const initNewInvoiceRows = (utils: CellUtilsDoubleT, invoice: InvoiceT) => {
    const { insertRows, insertRow } = initRowMaker(utils.ws, 'Инвойс_Bl_массив');

    insertRows({
        records: Object.values(invoice.productSortGroups),
        rowSettings: ({ record: r, total }) => {
            const fields = {
                bl: r.blNo,
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                empty3: '',
                empty4: '',
                empty5: '',
                pack: `1/${r.pack} kg`,
                places: total.places.count,
                placesTotal: total.placesTotal.count,
                price: r.amount.price.count,
                empty10: '',
                priceTotal: r.amount.priceTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportInvoice',
                merge: [{ start: 2, end: 5 }, { start: 9, end: 10 }],
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
            totalHeader: 'TOTAL / ВСЕГО',
            places: invoice.amount.places.count,
            placesTotal: invoice.amount.placesTotal.count,
            price: '-',
            empty10: '',
            priceTotal: invoice.amount.priceTotal.count,
        },
        merge: [{ start: 1, end: 5 }, { start: 9, end: 10 }],
        docType: 'exportInvoice',
        style: {
            common: {
                height: 50,
                alignment: 'center',
                border: { top: { style: 'thin' } },
                font: { size: 10, bold: true },
            },
            special: {
                places: { style: { alignment: { horizontal: 'right' } } },
                placesTotal: { style: { alignment: { horizontal: 'left' } } },
            },
        },
    });
};
