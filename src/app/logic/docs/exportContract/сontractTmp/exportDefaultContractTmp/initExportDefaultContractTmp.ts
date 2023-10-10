/* eslint-disable no-param-reassign */
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { AgreementT } from '../../groupBy/initAgreement';
import { initExportDefaultContractRows } from './initExportDefaultContractRows';

export const initExportDefaultContractTmp = async (
    utils: CellUtilsDoubleT,
    agreement: AgreementT,
) => {
    initExportDefaultContractRows(agreement.productsGroupedBy.invoices, utils);

    // mergeCells
    const startRow = utils.getRow('Цена_всего', 0).number;
    const endRow = utils.getRow('Адреса_покупатель_адрес', 0).number;

    for (let i = startRow; i <= endRow; i += 1) {
        utils.mergeCells({ row: i, startCol: 2, endCol: 5 });
        utils.mergeCells({ row: i, startCol: 6, endCol: 9 });
    }
};
