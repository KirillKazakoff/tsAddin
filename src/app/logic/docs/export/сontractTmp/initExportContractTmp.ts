import { Workbook } from 'exceljs';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExportDefaultContractTmp } from './exportDefaultContractTmp/initExportDefaultContractTmp';
import { initExportStorageContractTmp } from './exportStorageContractTmp/initExportStorageContractTmp';

import { getExportContractCells } from './getExportContractCells.ts';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { setPrintArea } from '../../../excel/utils/excelUtilsObj/setPrintArea';
import { ExportGroupT } from '../groupAgByNo';

export const initExportContractTmp = async (book: Workbook, agreement: ExportGroupT) => {
    const ws = book.getWorksheet('Export_Contract');
    const { operation, fields } = exportContractStore;
    const utils = initExcelUtils(ws, 'MID_Contract');

    const cells = getExportContractCells(agreement);
    cells.forEach((cell) => utils.setCell(cell));

    if (operation === 'export_storage' || operation === 'certificates') {
        await initExportStorageContractTmp(utils, agreement);
    } else {
        initExportDefaultContractTmp(utils, agreement);
    }

    // initPictures
    await utils.initPictures(
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
        fields.isPictures,
    );

    setPrintArea({ endCell: 'Адреса_подпись', utils });
};
