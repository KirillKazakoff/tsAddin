/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { Worksheet } from 'exceljs';
import { CellFullT, CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCellSingle, getCellDouble } from './getCell';
import { getRow } from './getRow';
import { deleteRow } from './deleteRow';

// eslint-disable-next-line max-len
export const setCells = (cells: CellFullT[]) => {
    const {
        height,
        name,
        isEmptyCell,
        isEmptyTitle,
        numFmt,
        deleteRows: deleteSettings,
    } = cells[0].settings;
    try {
        cells.forEach((c) => {
            const { value } = c.settings;
            const ws = c.cell.worksheet;
            const mainCell = ws.getCell(+c.cell.row, +c.cell.col);
            const titleCell = ws.getCell(+c.cell.row - 1, +c.cell.col);

            if (deleteSettings) {
                if (deleteSettings.onlyParent) {
                    deleteRow(ws)(name, 0);
                } else {
                    for (let i = deleteSettings.start; i < deleteSettings.end; i += 1) {
                        deleteRow(ws)(name, i);
                    }
                }

                return;
            }

            if (value) c.cell.value = value;

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
                mainCell.value = '';
                titleCell.value = '';
            }
        });
        return cells;
    } catch (e) {
        if (isEmptyTitle) return null;
        // console.log(e);
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
