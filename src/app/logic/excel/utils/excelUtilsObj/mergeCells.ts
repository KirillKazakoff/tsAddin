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
