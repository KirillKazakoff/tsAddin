import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../groupAgByNo';

export const initExportDefaultContractRows = (
    invoices: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    const { insertRows } = utils.initRowMaker({ cellName: 'Предмет_массив' });

    invoices.forEach((invoice) => {
        insertRows({
            records: invoice.groupedBy.product,
            deleteStartAmount: 1,
            headers: ({ record: r }) => ({
                price: `Цена, ${r.currency.symbol}/тн\nPrice, ${r.currency.symbol}/тн`,
            }),
            rowSettings: ({ record: r, total }) => {
                const fields = {
                    empty1: '',
                    product: `${r.product.ru.name}\n${r.product.eng.name}`,
                    m1: '',
                    vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                    consignee: `${r.consignee.fullName}\n${r.consignee.addres}`,
                    m2: '',
                    m3: '',
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
                            consignee: { style: { alignment: { horizontal: 'left', indent: 2 } } },
                        },
                    },
                    dynamicFormats: {
                        price: `#,##0.00_) \n${r.currency.symbol}`,
                    },
                };
            },
        });
    });
};
