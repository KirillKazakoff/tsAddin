/* eslint-disable no-param-reassign */
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { mergeFromTo } from '../../../../excel/utils/excelUtilsObj/mergeCells';
import { AgreementT } from '../../groupBy/initAgreement';
import { initExportDefaultContractRowsFCA } from './initExportDefaultContractFCARows';
import { initExportDefaultContractRows } from './initExportDefaultContractRows';

export const initExportDefaultContractTmp = async (
    utils: CellUtilsDoubleT,
    agreement: AgreementT,
) => {
    const { invoices } = agreement.productsGroupedBy;
    if (agreement.record.terms === 'FCA') {
        initExportDefaultContractRowsFCA(invoices, utils);
    } else {
        initExportDefaultContractRows(invoices, utils);
    }

    // prettier-ignore
    mergeFromTo(utils.ws, {
        row: {
            from: { name: 'Цена_всего' },
            to: { name: 'Адреса_покупатель_адрес' },
        },
        cols: [[2, 5], [6, 9]],
    });
};
