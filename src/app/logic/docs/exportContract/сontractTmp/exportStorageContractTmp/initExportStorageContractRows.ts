/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InvoiceProductGroupT, InvoicesT } from '../../groupBy/initInvoice';

export const initExportStorageContractRows = (
    invoices: InvoicesT,
    utils: CellUtilsT<string>,
) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Сертификаты_массив' });

    // Get product groups
    const invoicesArr = Object.values(invoices);
    const groups = invoicesArr.reduce<InvoiceProductGroupT[]>((total, invoice) => {
        const invoiceGroups = Object.values(invoice.productGroups);
        total.push(...invoiceGroups);
        return total;
    }, []);

    insertRows({
        records: groups,
        deleteStartAmount: 1,
        rowSettings: ({ record: r, total }) => {
            // empty spaces since additional columns for pictures
            const fields = {
                empty1: '',
                product: `${r.product.ru.name}\n${r.product.eng.name}`,
                m1: '',
                vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                consignee: `${r.consignee.fullName}\n${r.consignee.addres}`,
                m2: '',
                m3: '',
                placesTotal: total.placesTotal.count,
            };

            // prettier-ignore
            return {
                fields,
                docType: 'exportContract',
                style: {
                    common: {
                        height: 45,
                        border: 'all',
                        alignment: 'center',
                        font: { size: 9 },
                    },
                },
            };
        },
    });
};
