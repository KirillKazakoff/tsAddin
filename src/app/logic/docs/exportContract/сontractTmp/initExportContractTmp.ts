import { Workbook } from 'exceljs';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExportDefaultContractTmp } from './exportDefaultContractTmp/initExportDefaultContractTmp';
import { initExportStorageContractTmp } from './exportStorageContractTmp/initExportStorageContractTmp';
import { AgreementT } from '../groupBy/initAgreement';
import { getExportContractCells } from './getExportContractCells.ts';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';

export const initExportContractTmp = async (book: Workbook, agreement: AgreementT) => {
    const ws = book.getWorksheet('Export_Contract');
    const { operation } = exportContractStore;
    const offsetCol = operation === 'export' ? 4 : 3;
    const utils = initExcelUtils(ws, offsetCol);

    const cells = getExportContractCells(agreement);
    cells.forEach((cell) => utils.setCell(cell));

    if (operation === 'export_storage' || operation === 'certificates') {
        await initExportStorageContractTmp(utils, agreement);
    } else {
        initExportDefaultContractTmp(utils, agreement);
    }

    // initPictures
    utils.initPictures(
        [
            {
                key: exportContractStore.fields.podpisant.codeName,
                range: { start: 'Sign_seller_start', end: 'Seal_seller_end' },
            },
            {
                key: agreement.record.seller.codeName,
                range: { start: 'Seal_seller_start', end: 'Seal_seller_end' },
            },
            {
                key: agreement.record.agent.eng.signatory,
                range: { start: 'Sign_agent_start', end: 'Sign_agent_end' },
            },
            {
                key: agreement.record.agent.code,
                range: { start: 'Seal_agent_start', end: 'Seal_agent_end' },
            },
        ],
        operation === 'certificates',
    );

    // printAreaSettings
    const { cellCount, number } = utils.getRow('Адреса_подпись', 0);
    const column = ws.getColumn(cellCount).letter;
    ws.pageSetup.printArea = `A1:${column}${number + 2}`;
};
