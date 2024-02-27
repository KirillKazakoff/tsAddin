import { Workbook } from 'exceljs';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InnerGroupT } from '../groupInnerContracts';
import { initPortLetterRows } from './initPortLetterRows';
import popupStore from '../../../../stores/popupStore.ts/popupStore';
import { getPortLetterCells } from './getPortLetterCells';

export const initPortLetterTmp = (book: Workbook, contract: InnerGroupT) => {
    const ws = book.getWorksheet('Port_Letter');
    const utils = initExcelUtils(ws, '');

    // prettier-ignore
    const { record: { row } } = contract;

    if (!row.buyer.inn) {
        popupStore.pushStatus({
            title: 'Отсутствует ИНН',
            desc: 'Проверьте наличие ИНН в справочнике',
        });
    }

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
