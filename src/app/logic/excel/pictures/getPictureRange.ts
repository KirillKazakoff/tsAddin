import { Cell, Worksheet } from 'exceljs';
import { getCell } from '../utils/excelUtilsObj/getCell';
import type { PictureSettingsT } from './initPictureExcel';

export const getPictureRange = (range: PictureSettingsT['range'], ws: Worksheet) => {
    const startCl = getCell(ws)(range.start);
    let endCl: Cell;
    let text = '';

    if (range?.end) {
        endCl = getCell(ws)(range.end);
        text = `${startCl.$col$row}:${endCl.$col$row}`;
    }

    const rangeRes = {
        text,
        tl: { col: +startCl.col - 1, row: +startCl.row - 1 },
        ext: range?.ext,
        startCl,
        endCl,
    };
    return rangeRes;
};

export type PictureRangeT = ReturnType<typeof getPictureRange>;
