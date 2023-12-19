import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../../groupAgByNo';

export const initExportDefaultContractRowsFCA = (
    invoices: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Предмет_массив' });

    // Get product groups
    const invoicesArr = Object.values(invoices);
    const groups = invoicesArr.reduce<ExportGroupT[]>((total, invoice) => {
        const invoiceGroups = invoice.groupedBy.product;
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
                m1: '',
                m2: '',
                m3: '',
                vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                m4: '',
                price: r.amount.price.count,
                placesTotal: total.placesTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportContract',
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
