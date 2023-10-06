/* eslint-disable no-param-reassign */
import type { GroupedBlT } from '../../../../../types/typesContract';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { ExportRowT } from '../../../../../types/typesTables';
import { initRowMaker } from '../../../../excel/utils/excelUtilsObj/initRows';
import { borderAll, alignmentCenter } from '../../../styleRowCells';

export const initExportContractRowsR = (
    blGrouped: GroupedBlT<ExportRowT>,
    utils: CellUtilsDoubleT,
) => {
    const { insertRows } = initRowMaker(utils.ws, 'Сертификаты_массив');
    const groups = Object.values(blGrouped);

    groups.forEach((group) => {
        insertRows({
            records: group.groupedProductsArr,
            deleteStartAmount: 1,
            rowSettings: (r) => {
                const Qt = `\nИТОГО: ${group.total.placesTotal.str}`;
                let amount = r.rows.reduce<string>((total, row) => {
                    total = `${total} ${row.amount.placesTotal.str}\n`;
                    return total;
                }, '');
                amount += Qt;

                // empty spaces since additional columns for pictures
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

                const height = 40 + r.rows.length * 10;

                // prettier-ignore
                return {
                    fields,
                    merge: [{ start: 2, end: 3 }, { start: 5, end: 7 }],
                    style: {
                        common: {
                            height,
                            border: borderAll,
                            alignment: alignmentCenter,
                            font: { size: 9 },
                        },
                        special: [{ index: 1, style: { border: {} } }],
                    },
                };
            },
        });
    });
};
