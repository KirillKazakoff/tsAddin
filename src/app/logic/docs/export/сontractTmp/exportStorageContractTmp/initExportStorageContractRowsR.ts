/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../../groupAgByNo';

export const initExportStorageContractRowsR = (
    blGrouped: ExportGroupT[],
    utils: CellUtilsT<string>,
) => {
    const { insertRow, deleteStartRows } = utils.initRowMaker({
        cellName: 'Сертификаты_массив',
    });

    blGrouped.forEach((group) => {
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
                consignee: `${g.record.consignee.fullName}\n${g.record.consignee.addres}`,
                m2: '',
                m3: '',
                amount,
            };

            insertRow({
                fields,
                style: {
                    common: {
                        height: 40 + g.rows.length * 10,
                        border: 'all',
                        alignment: 'center',
                        font: { size: 9 },
                    },
                },
            });
        });
    });

    deleteStartRows(1);
};
