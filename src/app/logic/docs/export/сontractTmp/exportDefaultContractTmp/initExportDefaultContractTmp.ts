import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../../groupAgByNo';
import { initExportDefaultContractRowsFCA } from './initExportDefaultContractRowsFCA';
import { initExportDefaultContractRows } from './initExportDefaultContractRows';

export const initExportDefaultContractTmp = async (
    utils: CellUtilsT<string>,
    agreement: ExportGroupT,
) => {
    const { terms } = agreement.record;
    const { invoices } = agreement.groupedBy;

    utils.initTmp({
        initRows() {
            if (terms === 'FCA') {
                initExportDefaultContractRowsFCA(invoices, utils);
            } else {
                initExportDefaultContractRows(invoices, utils);
            }
        },
        // prettier-ignore
        mergeCells: [
            {
                row: {
                    from: { name: terms === 'FCA' ? 'Цена_неком' : 'Цена_всего' },
                    to: { name: 'Адреса_покупатель_адрес' },
                },
                cols: [[2, 5], [6, 9]],
            },
            {
                row: {
                    from: { name: 'Адреса_покупатель_банк_адрес' },
                    to: { name: 'Адреса_покупатель_банк_адрес' },
                },
                cols: [[2, 5], [6, 9]],
            },
        ],
    });
};
