/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { Worksheet } from 'exceljs';
import _ from 'lodash';
import { getRow } from './getRow';
import type { FieldsGenT } from './initRows';
import { getCellSingle } from './getCell';

export type MergeSettingsT = {
    row: number;
    startCol: number;
    endCol: number;
    endRow?: number;
};

type MergeT = { start: number; end: number };

export const mergeCells = (ws: Worksheet) => (settings: MergeSettingsT) => {
    const { row, startCol, endCol } = settings;

    const endRow = settings.endRow ? settings.endRow : row;
    ws.unMergeCells(row, startCol, endRow, endCol);
    ws.mergeCells(row, startCol, endRow, endCol);
};

export const mergeFromTo = (ws: Worksheet) => (
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
            oneRow?: boolean;
        };
        cols?:
        | number[][]
        | {
            start: string;
            end: string;
        }[];
    }[],
) => {
    settings.forEach((setup) => {
        const { row, cols } = setup;
        const startRow = getRow(ws)(row.from.name, row.from.offset || 0).number;
        const endRow = getRow(ws)(row.to.name, row.to.offset || 0).number;

        const cbCols = (cArray: unknown, rowIndex: number) => {
            let start = 0;
            let end = 0;
            if (typeof cols[0][0] === 'number') {
                const [s, e] = cArray as number[];
                start = s;
                end = e;
            } else {
                const col = cArray as { start: string; end: string };
                start = +getCellSingle(ws)(col.start).col;
                end = +getCellSingle(ws)(col.end).col;
            }
            mergeCells(ws)({
                row: rowIndex,
                endRow: row.oneRow ? endRow : null,
                startCol: start,
                endCol: end,
            });
        };

        if (row.oneRow) {
            cols.forEach((cArray: unknown) => cbCols(cArray, startRow));
            return;
        }

        for (let i = startRow; i <= endRow; i += 1) {
            cols.forEach((cArray: unknown) => cbCols(cArray, i));
        }
    });
};

export const mergeRowCells = (ws: Worksheet, fields: FieldsGenT, row: number) => {
    const merge: MergeT[] = [];
    const keysArr = Object.keys(fields);
    const isMerge = (key: string) => key?.length === 2 && key[0] === 'm';

    keysArr.forEach((key, i) => {
        if (key.includes('empty')) return;

        if (isMerge(key)) {
            // check if such merge already included
            if (merge.some((range) => range.end >= i)) return;

            const mergeRange: MergeT = { start: i, end: i + 1 };

            let k = i;
            while (isMerge(keysArr[k])) {
                mergeRange.end = k + 1;
                k += 1;
            }
            merge.push(mergeRange);
        }
    });

    merge.forEach(({ start, end }) => {
        const { style: styleStart } = _.cloneDeep(ws.getCell(row, start));
        const styleEnd = _.cloneDeep(ws.getCell(row, end));

        mergeCells(ws)({
            startCol: start,
            endCol: end,
            row,
        });

        styleEnd.border = styleStart.border;
    });
};
