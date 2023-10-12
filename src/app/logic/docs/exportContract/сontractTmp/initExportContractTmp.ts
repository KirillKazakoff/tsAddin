import { Workbook } from 'exceljs';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExcelUtilsDouble } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initExportDefaultContractTmp } from './exportDefaultContractTmp/initExportDefaultContractTmp';
import { initExportStorageContractTmp } from './exportStorageContractTmp/initExportStorageContractTmp';
import { AgreementT } from '../groupBy/initAgreement';
import { getExportContractCells } from './getExportContractCells.ts';
import { initPicturesExcel } from '../../../excel/pictures/initPictureExcel';

export const initExportContractTmp = async (
    book: Workbook,
    agreement: AgreementT,
) => {
    const ws = book.getWorksheet('Export_Contract');
    const { operation } = exportContractStore;
    const cellOffset = operation === 'export' ? 4 : 3;
    const utils = initExcelUtilsDouble(ws, cellOffset);

    const cells = getExportContractCells(agreement);
    cells.forEach((cell) => utils.setCell(cell));

    if (operation === 'export_storage' || operation === 'certificates') {
        await initExportStorageContractTmp(utils, agreement);
    } else {
        initExportDefaultContractTmp(utils, agreement);
    }

    // initPictures
    await initPicturesExcel(
        utils.ws,
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
        true, // operation === 'certificates',
    );

    // printAreaSettings
    const { cellCount, number } = utils.getRow('Адреса_подпись', 0);
    const column = ws.getColumn(cellCount).letter;
    ws.pageSetup.printArea = `A1:${column}${number + 2}`;
};
