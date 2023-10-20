/* eslint-disable max-len */
import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { CellUtilsDoubleT } from '../../../../../types/typesExcelUtils';
import { initExportStorageContractRowsR } from './initExportStorageContractRowsR';
import { initExportStorageContractRows } from './initExportStorageContractRows';
import { AgreementT } from '../../groupBy/initAgreement';
import { mergeFromTo } from '../../../../excel/utils/excelUtilsObj/mergeCells';

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

    // prettier-ignore
    mergeFromTo(utils.ws, {
        row: {
            from: { name: 'Доставка_транспорт' },
            to: { name: 'Адреса_покупатель_адрес' },
        },
        cols: [[2, 4], [5, 8]],
    });
};
