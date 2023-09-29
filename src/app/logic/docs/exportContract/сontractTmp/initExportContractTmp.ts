import { Workbook } from 'exceljs';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExcelUtilsDouble } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initExportDefaultContractTmp } from './exportDefaultContractTmp/initExportDefaultContractTmp';
import { initExportStorageContractTmp } from './exportStorageContractTmp/initExportStorageContractTmp';
import { AgreementT } from '../groupBy/initAgreement';
import { getExportContractCells } from './getExportContractCells.ts';

export const initExportContractTmp = async (
    book: Workbook,
    agreement: AgreementT,
) => {
    const ws = book.getWorksheet('Export_Contract');
    const { operation } = exportContractStore;
    const cellOffset = operation === 'export' ? 1 : 3;
    const utils = initExcelUtilsDouble(ws, cellOffset);

    const cells = getExportContractCells(agreement);
    cells.forEach((cell) => utils.setCell(cell));

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
