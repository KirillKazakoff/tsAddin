import { Worksheet } from 'exceljs';

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
