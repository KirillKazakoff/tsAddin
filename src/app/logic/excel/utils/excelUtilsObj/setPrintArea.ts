/* eslint-disable no-param-reassign */
import { Worksheet } from 'exceljs';
import { getRow } from './getRow';

export type PrintSettingsT = {
    endCell: string;
    offset?: number;
};

export const setPrintArea = (ws: Worksheet) => (settings: PrintSettingsT) => {
    const { offset, endCell } = settings;
    const { cellCount, number } = getRow(ws)(endCell, offset || 0);
    const column = ws.getColumn(cellCount).letter;

    ws.pageSetup.printArea = `A1:${column}${number + 1}`;
};
