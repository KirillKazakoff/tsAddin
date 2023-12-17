/* eslint-disable no-param-reassign */
import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../../groupAgByNo';
import { initExportDefaultContractRowsFCA } from './initExportDefaultContractFCARows';
import { initExportDefaultContractRows } from './initExportDefaultContractRows';

export const initExportDefaultContractTmp = async (
    utils: CellUtilsT<string>,
    agreement: ExportGroupT,
) => {
    const { invoices } = agreement.groupedBy;
    if (agreement.record.terms === 'FCA') {
        initExportDefaultContractRowsFCA(invoices, utils);
    } else {
        initExportDefaultContractRows(invoices, utils);
    }

    // prettier-ignore
    utils.mergeFromTo({
        row: {
            from: { name: 'Цена_всего' },
            to: { name: 'Адреса_покупатель_адрес' },
        },
        cols: [[2, 5], [6, 9]],
    });
    // prettier-ignore
    utils.mergeFromTo({
        row: {
            from: { name: 'Адреса_покупатель_банк_адрес' },
            to: { name: 'Адреса_покупатель_банк_адрес' },
        },
        cols: [[2, 5], [6, 9]],
    });
};
