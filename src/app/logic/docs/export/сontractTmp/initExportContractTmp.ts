import { Workbook } from 'exceljs';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { getExportContractCells } from './getExportContractCells.ts';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { ExportGroupT } from '../groupAgByNo';
import { initExportStorageContractRows } from './initExportStorageContractRows';
import { initExportStorageContractRowsR } from './initExportStorageContractRowsR';
import { initExportDefaultContractRows } from './initExportDefaultContractRows';
import { initExportDefaultContractRowsFCA } from './initExportDefaultContractRowsFCA';

export const initExportContractTmp = async (book: Workbook, agreement: ExportGroupT) => {
    const ws = book.getWorksheet('Export_Contract');
    const { operation, fields } = exportContractStore;
    const { terms } = agreement.record;
    const { invoices, bl } = agreement.groupedBy;
    const utils = initExcelUtils(ws, 'MID_Contract');

    await utils.initTmp({
        cells: getExportContractCells(agreement),
        initRows: () => {
            const isStorageTmp = operation === 'export_storage' || operation === 'certificates';

            if (isStorageTmp && terms !== 'FCA') {
                if (exportContractStore.operation === 'export_storage') {
                    initExportStorageContractRows(invoices, utils);
                }
                if (exportContractStore.operation === 'certificates') {
                    initExportStorageContractRowsR(bl, utils);
                }
            } else if (terms === 'FCA') {
                initExportDefaultContractRowsFCA(invoices, utils);
            } else {
                initExportDefaultContractRows(invoices, utils);
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
