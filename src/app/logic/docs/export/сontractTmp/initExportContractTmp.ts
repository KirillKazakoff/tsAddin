import { Workbook } from 'exceljs';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExportDefaultContractTmp } from './exportDefaultContractTmp/initExportDefaultContractTmp';
import { initExportStorageContractTmp } from './exportStorageContractTmp/initExportStorageContractTmp';
import { getExportContractCells } from './getExportContractCells.ts';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../groupAgByNo';

export const initExportContractTmp = async (book: Workbook, agreement: ExportGroupT) => {
    const ws = book.getWorksheet('Export_Contract');
    const { operation, fields, currentTerms } = exportContractStore;
    const utils = initExcelUtils(ws, 'MID_Contract');

    await utils.initTmp({
        cells: getExportContractCells(agreement),
        initTmpCb: async () => {
            const isStorageTmp = operation === 'export_storage' || operation === 'certificates';

            if (isStorageTmp && currentTerms !== 'FCA') {
                await initExportStorageContractTmp(utils, agreement);
            } else {
                initExportDefaultContractTmp(utils, agreement);
            }
        },
        pictureSettings: {
            isActive: fields.isPictures,
            settings: [
                {
                    key: fields.podpisant.code,
                    range: { start: 'Sign_seller_start', end: 'Seal_seller_end' },
                },
                {
                    key: agreement.record.seller.code,
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
        },
        printSettings: { endCell: 'Адреса_подпись' },
    });
};
