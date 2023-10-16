import { InvoicesT, ProductGroupT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { initRowMaker } from '../../../../excel/utils/excelUtilsObj/initRows';

export const initExportDefaultContractRowsFCA = (
    invoices: InvoicesT,
    utils: CellUtilsDoubleT,
) => {
    const { insertRows } = initRowMaker(utils.ws, 'Предмет_массив');

    // Get product groups
    const invoicesArr = Object.values(invoices);
    const groups = invoicesArr.reduce<ProductGroupT[]>((total, invoice) => {
        const invoiceGroups = Object.values(invoice.productGroups);
        total.push(...invoiceGroups);
        return total;
    }, []);

    insertRows({
        records: groups,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            const fields = {
                empty1: '',
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                empty3: '',
                empty4: '',
                empty5: '',
                vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                empty7: '',
                price: r.amount.price.count,
                placesTotal: total.placesTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportContract',
                merge: [{ start: 2, end: 5 }, { start: 6, end: 7 }],
                style: {
                    common: {
                        height: 55,
                        border: 'outside',
                        alignment: 'center',
                        font: { size: 10 },
                    },
                    special: {
                        vessel: {
                            style: { border: { left: { style: 'thin' } } },
                        },
                    },
                },
            };
        },
    });
};
