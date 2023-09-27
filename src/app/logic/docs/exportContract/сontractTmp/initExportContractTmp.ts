import { Workbook } from 'exceljs';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExcelUtilsDouble } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initExportDefaultContractTmp } from './exportContractTmp/initExportDefaultContractTmp';
import { initExportStorageContractTmp } from './exportStorageContractTmp/initExportStorageContractTmp';
import { AgreementT } from '../groupBy/initAgreement';

export const initExportContractTmp = async (
    book: Workbook,
    agreement: AgreementT,
) => {
    const ws = book.getWorksheet('Export_Contract');
    const { operation } = exportContractStore;
    const cellOffset = operation === 'export_storage' ? 3 : 1;
    const utils = initExcelUtilsDouble(ws, cellOffset);

    if (operation === 'export_storage' || operation === 'certificates') {
        await initExportStorageContractTmp(utils, agreement);
    } else {
        initExportDefaultContractTmp(utils, agreement);
    }

    // printAreaSettings
    const { cellCount, number } = utils.getRow('Адреса_подпись', 0);
    const column = ws.getColumn(cellCount).letter;
    ws.pageSetup.printArea = `A1:${column}${number + 2}`;
};
