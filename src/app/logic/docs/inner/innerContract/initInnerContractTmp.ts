import { Workbook } from 'exceljs';
import { InnerGroupT } from '../groupInnerContracts';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { getInnerContractCells } from './getInnerContractCells';
import { initInnerContractRows } from './initInnerContractRows';
import innerContractStore from '../../../../stores/docsStores/innerContractStore';

export const initInnerContractTmp = async (book: Workbook, contract: InnerGroupT) => {
    const ws = book.getWorksheet('Contract');
    const utils = initExcelUtils(ws, '');

    const cells = getInnerContractCells(contract);
    cells.forEach((cell) => utils.setCell(cell));

    initInnerContractRows(contract, utils);

    await utils.initPictures(
        [
            {
                key: innerContractStore.fields.podpisant.code,
                range: {
                    start: 'Sign_seller_start',
                    ext: { height: 80, width: 180 },
                },
            },
            {
                key: contract.record.row.seller.code,
                range: {
                    start: 'Seal_seller_start',
                    ext: { height: 175, width: 175 },
                },
            },
        ],
        innerContractStore.fields.isPictures,
    );

    utils.mergeFromTo([
        {
            row: {
                from: { name: 'Договор_конец_предмет' },
                to: { name: 'Договор_цена_начало' },
            },
            cols: [{ start: 'Pg_start', end: 'Pg_end' }],
        },
        {
            row: {
                from: { name: 'Договор_цена_всего' },
                to: { name: 'Договор_адреса_заголовок' },
            },
            cols: [{ start: 'Pg_start', end: 'Pg_end' }],
        },
        {
            row: {
                from: { name: 'Договор_адреса_поставщик' },
                to: { name: 'Договор_адреса_поставщик_фио' },
            },
            cols: [
                { start: 'Pg_start', end: 'Договор_адреса_поставщик_конец' },
                { start: 'Договор_адреса_покупатель', end: 'Pg_end' },
            ],
        },
    ]);
};
