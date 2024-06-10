import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { initExportStorageContractRowsR } from './initExportStorageContractRowsR';
import { initExportStorageContractRows } from './initExportStorageContractRows';
import { CellUtilsT } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../../groupAgByNo';

export const initExportStorageContractTmp = async (
    utils: CellUtilsT<string>,
    agreement: ExportGroupT,
) => {
    utils.initTmp({
        initRows() {
            if (exportContractStore.operation === 'export_storage') {
                initExportStorageContractRows(agreement.groupedBy.invoices, utils);
            }
            if (exportContractStore.operation === 'certificates') {
                initExportStorageContractRowsR(agreement.groupedBy.bl, utils);
            }
        },
        // prettier-ignore
        mergeCells: [
            {
                row: {
                    from: { name: 'Доставка_транспорт' },
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
