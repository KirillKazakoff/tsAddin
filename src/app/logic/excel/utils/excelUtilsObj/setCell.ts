/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { Worksheet } from 'exceljs';
import { CellFullT, CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCellSingle, getCellDouble } from './getCell';
import { getRow } from './getRow';

// eslint-disable-next-line max-len
export const setCells = (cells: CellFullT[]) => {
    const {
        height, name, isEmptyCell, isEmptyTitle, numFmt,
    } = cells[0].settings;
    try {
        cells.forEach((c) => {
            // trycatc
            const { value } = c.settings;
            const ws = c.cell.worksheet;

            if (value) {
                c.cell.value = value;
            }

            if (isEmptyCell) {
                c.cell.value = '';
                return;
            }

            if (numFmt) c.cell.numFmt = numFmt;

            if (height) {
                const row = getRow(ws)(name);
                row.height = height;
            }
            if (isEmptyTitle) {
                const mainCell = ws.getCell(+c.cell.row, +c.cell.col);
                const titleCell = ws.getCell(+c.cell.row - 1, +c.cell.col);
                mainCell.value = '';
                titleCell.value = '';
            }
        });
        return cells;
    } catch (e) {
        if (isEmptyTitle) return null;
        // eslint-disable-next-line no-console
        console.error(`Ошибка при установке значения ${name}`);
        return null;
    }
};

export const setCellSingle = (ws: Worksheet) => (settings: CellObjT) => {
    const { name, offsetRow } = settings;

    const cellObj = setCells([
        {
            cell: getCellSingle(ws)(name, offsetRow),
            settings,
        },
    ]);
    return cellObj[0].cell;
};

export const setCellDouble = (ws: Worksheet, offsetCell: string) => (settings: CellObjDoubleT) => {
    const {
        name, offsetRow, eng, ru,
    } = settings;

    const { cellEng, cellRus } = getCellDouble(ws, offsetCell)(name, offsetRow);
    if (!cellEng) return null;

    const cellObj = setCells([
        { cell: cellEng, settings: { ...(settings as any), value: eng } },
        { cell: cellRus, settings: { ...(settings as any), value: ru } },
    ]);

    return { cellEng: cellObj[0].cell, cellRus: cellObj[0].cell };
};
