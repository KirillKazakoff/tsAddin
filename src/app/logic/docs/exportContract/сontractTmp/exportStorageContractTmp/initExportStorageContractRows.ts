/* eslint-disable no-param-reassign */
import { ProductGroupT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { initRowMaker } from '../../../../excel/utils/excelUtilsObj/initRows';
import { alignmentCenter, borderAll } from '../../../styleRowCells';
import { InvoicesT } from '../../groupBy/initInvoice';

export const initExportStorageContractRows = (
    invoices: InvoicesT,
    utils: CellUtilsDoubleT,
) => {
    const { insertRows } = initRowMaker(utils.ws, 'Сертификаты_массив');

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
        rowSettings: ({ record: r, total }, i) => {
            // empty spaces since additional columns for pictures
            const fields = {
                empty1: '',
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                empty3: '',
                vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                consignee: `${r.consignee.fullName}\n${r.consignee.addres}`,
                empty6: '',
                empty7: '',
                placesTotal: total.placesTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportContract',
                merge: [{ start: 2, end: 3 }, { start: 5, end: 7 }],
                style: {
                    common: {
                        height: 45,
                        border: borderAll,
                        alignment: alignmentCenter,
                        font: { size: 9 },
                    },
                    special: [{ index: 1, style: { border: {} } }],
                },
            };
        },
    });
};
