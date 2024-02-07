import { Cell, Worksheet } from 'exceljs';

export const setHeaders = (
    fields: Record<string, string>,
    headers: Record<string, string>,
    ws: Worksheet,
    insertIndex: number,
) => {
    if (!headers) return;

    const cellObj: { [key: string]: Cell } = {};
    const keys = Object.keys(fields);

    const row = ws.getRow(insertIndex);

    row.eachCell((cell, index) => {
        cellObj[keys[index - 1]] = cell;
    });

    Object.keys(headers).forEach((key) => {
        const cell = cellObj[key];

        if (!cell) return;

        // console.log(cellObj[key]);
        cellObj[key].value = headers[key];
    });
};
