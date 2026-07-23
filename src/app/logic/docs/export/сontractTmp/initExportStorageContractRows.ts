/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { myStyles } from '../../../excel/utils/styleRowCells';
import { ExportGroupT } from '../groupAgByNo';

export const initExportStorageContractRows = (
    invoices: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    // table header replace
    const headersCellName = 'Контракт_предмет_заголовки';

    utils.initRowMaker({ cellName: headersCellName }).insertRow({
        fields: {
            empty1: '',
            desc: 'Продукция / Goods description',
            m1: '',
            vessel: 'Изготовитель\nFishing Vessel',
            m2: '',
            price: 'Цена, $/кг\nPrice,$/kg',
            m3: '',
            placesTotal: 'Кол-во, кг\nQuantity, kg',
            m4: '',
        },
        style: {
            common: {
                alignment: 'center',
                border: 'all',
                fill: myStyles.fill.fillGray,
            },
            special: {
                empty1: {
                    style: {
                        border: { left: null, top: null, bottom: null },
                        fill: myStyles.fill.noFill,
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
                    desc: `${r.product.ru.name}\n${r.product.eng.name}`,
                    m1: '',
                    vessel: `${r.vessel.ru.name}\n${r.vessel.eng.name}`,
                    m2: '',
                    price: r.amount.price.count,
                    m3: '',
                    placesTotal: total.placesTotal.count,
                    m4: '',
                };

                // prettier-ignore
                return {
                    fields,
                    docType: 'exportContract',
                    style: {
                        common: {
                            font: { size: 10 },
                            height: 60,
                            border: 'all',
                            alignment: 'center',
                        },
                    },
                };
            },
        });
    });
};
