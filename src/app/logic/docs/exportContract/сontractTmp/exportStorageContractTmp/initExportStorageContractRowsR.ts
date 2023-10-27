/* eslint-disable no-param-reassign */
import { ExportRowT } from '../../../../../types/typesTables';
import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { BlGroupsT } from '../../groupBy/initBlGroup';

export const initExportStorageContractRowsR = (
    blGrouped: BlGroupsT<ExportRowT>,
    utils: CellUtilsT<number>,
) => {
    const { insertRow, deleteStartRows } = utils.initRowMaker({
        cellName: 'Сертификаты_массив',
    });

    Object.values(blGrouped).forEach((group) => {
        group.groupedProductsArr.forEach((r) => {
            const Qt = `\nИТОГО: ${group.total.placesTotal.str}`;
            let amount = r.rows.reduce<string>((total, row) => {
                total = `${total} ${row.amount.placesTotal.str}\n`;
                return total;
            }, '');
            amount += Qt;

            const fields = {
                empty1: '',
                product: `${r.record.product.ru.name}\n${r.record.product.eng.name}`,
                empty3: '',
                vessel: `${r.record.vessel.ru.name}\n${r.record.vessel.eng.name}`,
                consignee: `${r.record.vessel.ru.name}\n${r.record.vessel.eng.name}`,
                empty6: '',
                empty7: '',
                amount,
            };

            insertRow({
                fields,
                merge: [
                    { start: 2, end: 3 },
                    { start: 5, end: 7 },
                ],
                style: {
                    common: {
                        height: 40 + r.rows.length * 10,
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
