/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { myStyles } from '../../../excel/utils/styleRowCells';
import { ExportGroupT } from '../groupAgByNo';

export const initExportStorageContractRowsR = (
    blGroups: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    const { insertRow, deleteStartRows } = utils.initRowMaker({
        cellName: 'Предмет_массив',
    });

    // table header replace
    const headersCellName = 'Контракт_предмет_заголовки';

    utils.initRowMaker({ cellName: headersCellName }).insertRow({
        fields: {
            empty1: '',
            desc: 'Продукция / Goods description',
            m1: '',
            vessel: 'Изготовитель\nFishing Vessel',
            m2: '',
            consignee: 'Получатель сертификатов / Certificates Consignee',
            m3: '',
            m4: '',
            placesTotal: 'Кол-во, тн\nQuantity, tn',
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
    blGroups.forEach((group) => {
        group.groupedBy.product.forEach((g) => {
            const amountTotal = `\nИТОГО: ${g.total.placesTotal.str}`;
            let amount = g.rows.reduce<string>((total, row) => {
                total = `${total} ${row.amount.placesTotal.str}\n`;
                return total;
            }, '');
            amount += amountTotal;

            const fields = {
                empty1: '',
                product: `${g.record.product.ru.name}\n${g.record.product.eng.name}`,
                m1: '',
                vessel: `${g.record.vessel.ru.name}\n${g.record.vessel.eng.name}`,
                m2: '',
                consignee: `${g.record.consignee.fullName}\n${g.record.consignee.addres}`,
                m3: '',
                m4: '',
                amount,
            };

            insertRow({
                fields,
                style: {
                    common: {
                        height: 50 + g.rows.length * 10,
                        border: 'all',
                        alignment: 'center',
                        font: { size: 10 },
                    },
                },
            });
        });
    });

    deleteStartRows(1);
};
