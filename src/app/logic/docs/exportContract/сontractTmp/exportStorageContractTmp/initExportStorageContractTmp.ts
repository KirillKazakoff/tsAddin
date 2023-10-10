/* eslint-disable max-len */
import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { initExportStorageContractRowsR } from './initExportStorageContractRowsR';
import { initExportStorageContractRows } from './initExportStorageContractRows';
import { AgreementT } from '../../groupBy/initAgreement';

export const initExportStorageContractTmp = async (
    utils: CellUtilsDoubleT,
    agreement: AgreementT,
) => {
    if (exportContractStore.operation === 'export_storage') {
        initExportStorageContractRows(agreement.productsGroupedBy.invoices, utils);
    }
    if (exportContractStore.operation === 'certificates') {
        initExportStorageContractRowsR(agreement.productsGroupedBy.bl, utils);
    }

    // mergeCells
    const startRow = utils.getRow('Доставка_транспорт', 0).number;
    const endRow = utils.getRow('Адреса_покупатель_адрес', 0).number;

    for (let i = startRow; i <= endRow; i += 1) {
        utils.mergeCells({ row: i, startCol: 2, endCol: 4 });
        utils.mergeCells({ row: i, startCol: 5, endCol: 8 });
    }
};
