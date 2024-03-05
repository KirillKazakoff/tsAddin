import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initPortLetterRows } from './initPortLetterRows';
import { getPortLetterCells } from './getPortLetterCells';
import { InnerGroupT } from '../groupInnerContracts';

export const initPortLetterTmp = (book: Workbook, contract: InnerGroupT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');
    const cells = getPortLetterCells(contract);

    cells.forEach((cell) => utils.setCell(cell));

    initPortLetterRows(contract, utils);

    utils.mergeFromTo([
        {
            row: {
                from: { name: 'Образцы_выдача' },
                to: { name: 'Merge_end' },
            },
            cols: [{ start: 'Banner_start', end: 'Pg_end' }],
        },
    ]);
};
