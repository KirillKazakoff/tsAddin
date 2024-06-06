/* eslint-disable no-param-reassign */
import { Worksheet } from 'exceljs';
import { CellFullT, CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCellSingle, getCellDouble } from './getCell';
import { getRow } from './getRow';
import { deleteRow } from './deleteRow';

export const setCells = (cells: CellFullT[]) => {
    const {
        name, height, numFmt, deleteRows: deleteSettings,
    } = cells[0].settings;

    try {
        cells.forEach((c) => {
            const ws = c.cell.worksheet;
            const defineCell = c.settings?.defineCell;

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

            if (defineCell) {
                const cell = ws.getCell(
                    +c.cell.row + defineCell.offset.y,
                    +c.cell.col + defineCell.offset.x,
                );

                setCells([{ cell, settings: defineCell.cell }]);
            }

            // if (typeof value === 'string' || typeof value === 'number') c.cell.value = value;
            c.cell.value = c.settings.value;

            if (numFmt) c.cell.numFmt = numFmt;

            if (height) {
                const row = getRow(ws)(name);
                row.height = height;
            }
        });
        return cells;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
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
    return cellObj[0].cell;
};

export const setCellDouble = (ws: Worksheet, offsetCell: string) => (settings: CellObjDoubleT) => {
    const {
        name, offsetRow, eng, ru, defineCell,
    } = settings;

    const { cellEng, cellRus } = getCellDouble(ws, offsetCell)(name, offsetRow);
    if (!cellEng) return null;

    const cellObj = setCells([
        { cell: cellEng, settings: { ...(settings as any), value: eng } },
        {
            cell: cellRus,
            settings: {
                ...(settings as any),
                value: ru,
                defineCell: defineCell
                    ? {
                        cell: defineCell?.cellRu
                            ? defineCell.cellRu
                            : defineCell?.cell,
                        offset: defineCell.offset,
                    }
                    : null,
            },
        },
    ]);

    return { cellEng: cellObj[0].cell, cellRus: cellObj[0].cell };
};
