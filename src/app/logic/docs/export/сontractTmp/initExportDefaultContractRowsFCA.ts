import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { myStyles } from '../../../excel/utils/styleRowCells';
import { ExportGroupT } from '../groupAgByNo';

export const initExportDefaultContractRowsFCA = (
    invoices: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    // table header replace
    const headersCellName = 'Контракт_предмет_заголовки';

    utils.initRowMaker({ cellName: headersCellName }).insertRow({
        fields: {
            empty1: '',
            desc: 'Продукция\nGoods description',
            m1: '',
            m2: '',
            m3: '',
            vessel: 'Изготовитель\nFishing Vessel',
            m4: '',
            price: 'Цена, $/тн\nPrice,$/тн',
            placesTotal: 'Кол-во, тн\nQuantity, tn',
        },
        style: {
            common: {
                alignment: 'center',
                border: 'outside',
                fill: myStyles.fill.fillGray,
            },
            special: {
                empty1: {
                    style: {
                        fill: myStyles.fill.noFill,
                    },
                },
                vessel: {
                    style: {
                        border: { left: { style: 'thin' } },
                    },
                },
            },
        },
    });

    utils.deleteRow(headersCellName);

    // insert table rows
    const { insertRows } = utils.initRowMaker({ cellName: 'Предмет_массив' });

    invoices.forEach((invoice) => {
        insertRows({
            records: invoice.groupedBy.product,
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
    });
};
