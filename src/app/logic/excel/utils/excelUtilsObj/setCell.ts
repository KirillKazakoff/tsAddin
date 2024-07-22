/* eslint-disable no-param-reassign */
import { Worksheet } from 'exceljs';
import { CellFullT, CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCellSingle, getCellDouble } from './getCell';
import { getRow } from './getRow';
import { deleteRow } from './deleteRow';

export const setCells = (cells: CellFullT[]) => {
    const {
        name,
        height,
        numFmt,
        deleteRows: deleteSettings,
        fill,
        alignment,
        font,
        isEmptyCell,
    } = cells[0].settings;

    try {
        cells.forEach((c) => {
            if (!c) return;

            const ws = c.cell.worksheet;
            const redefineCell = c.settings?.redefineCell;

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

            if (redefineCell) {
                const { commonStyles } = redefineCell;
                const cell = ws.getCell(
                    +c.cell.row + redefineCell.offset.y,
                    +c.cell.col + redefineCell.offset.x,
                );

                setCells([{ cell, settings: { ...redefineCell.cell, ...commonStyles } }]);
            }

            if (typeof c.settings.value !== 'undefined') {
                c.cell.value = c.settings.value;
            }

            if (isEmptyCell) {
                c.cell.value = null;
            }
            if (height) {
                const row = getRow(ws)(name);
                row.height = height;
            }

            if (numFmt) {
                c.cell.numFmt = numFmt;
            }
            if (fill) {
                c.cell.fill = fill;
            }
            if (alignment) {
                c.cell.style.alignment = alignment;
            }
            if (font) {
                c.cell.style.font = font;
            }
        });
        return cells;
    } catch (e) {
        if (isEmptyCell) return null;
        // eslint-disable-next-line no-console
        console.log(e);
        // eslint-disable-next-line no-console
        console.error(`Ошибка при установке значения ${cells[0].settings.name}`);
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
    if (!cellObj) return null;
    return cellObj[0].cell;
};

export const setCellDouble = (ws: Worksheet, offsetCell: string) => (settings: CellObjDoubleT) => {
    const {
        name, offsetRow, eng, ru, redefineCell,
    } = settings;

    const { cellEng, cellRus } = getCellDouble(ws, offsetCell)(name, offsetRow);
    if (!cellEng) return null;

    const cellRu: CellFullT = typeof ru !== 'undefined'
        ? {
            cell: cellRus,
            settings: {
                ...(settings as any),
                value: ru,
                redefineCell: redefineCell
                    ? {
                        ...redefineCell,
                        cell: redefineCell?.cellRu
                            ? redefineCell.cellRu
                            : redefineCell?.cell,
                    }
                    : null,
            },
        }
        : null;

    const cellObj = setCells([
        { cell: cellEng, settings: { ...(settings as any), value: eng } },
        cellRu,
    ]);

    return { cellEng: cellObj[0].cell, cellRus: cellObj[0].cell };
};
