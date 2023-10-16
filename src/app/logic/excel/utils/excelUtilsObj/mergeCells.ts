import { Worksheet } from 'exceljs';
import { getRow } from './getRow';

export type MergeSettingsT = {
    row: number;
    startCol: number;
    endCol: number;
};

export const mergeCells = (ws: Worksheet, settings: MergeSettingsT) => {
    ws.unMergeCells(settings.row, settings.startCol, settings.row, settings.endCol);
    ws.mergeCells(settings.row, settings.startCol, settings.row, settings.endCol);
};

export const mergeTotal = (settings: {
    rows: number[];
    ranges: number[][];
    ws: Worksheet;
}) => {
    const { rows, ranges: cols, ws } = settings;

    rows.forEach((mergeRow) => cols.forEach(([startCol, endCol]) => {
        mergeCells(ws, {
            row: mergeRow,
            startCol,
            endCol,
        });
    }));
};

export const mergeFromTo = (
    ws: Worksheet,
    settings: {
        row: {
            from: {
                name: string;
                offset?: number;
            };
            to: {
                name: string;
                offset?: number;
            };
        };
        cols: number[][];
    },
) => {
    const { row, cols: merge } = settings;
    const startRow = getRow(ws, row.from.name, row.from.offset || 0).number;
    const endRow = getRow(ws, row.to.name, row.to.offset || 0).number;

    for (let i = startRow; i <= endRow; i += 1) {
        merge.forEach(([start, end]) => {
            mergeCells(ws, { row: i, startCol: start, endCol: end });
        });
    }
};
