import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initPortLetterRows } from './initPortLetterRows';
import { getPortLetterCells } from './getPortLetterCells';
import type { PortDocT } from './createPortLetter';

export const initPortLetterTmp = (book: Workbook, contract: PortDocT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');
    const cells = getPortLetterCells(contract);

    cells.forEach((cell) => utils.setCell(cell));

    initPortLetterRows(contract, utils);

    utils.mergeFromTo([
        {
            row: {
                from: { name: 'Письмо_описание_подвал' },
                to: { name: 'Merge_end' },
            },
            cols: [{ start: 'Banner_start', end: 'Pg_end' }],
        },
    ]);
};
