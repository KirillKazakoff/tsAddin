/* eslint-disable no-param-reassign */
import { ExportRowT } from '../../../../../types/typesTables';
import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { BlGroupsT } from '../../groupBy/initBlGroup';

export const initExportStorageContractRowsR = (
    blGrouped: BlGroupsT<ExportRowT>,
    utils: CellUtilsT<string>,
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
                m1: '',
                vessel: `${r.record.vessel.ru.name}\n${r.record.vessel.eng.name}`,
                consignee: `${r.record.vessel.ru.name}\n${r.record.vessel.eng.name}`,
                m2: '',
                m3: '',
                amount,
            };

            insertRow({
                fields,
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
