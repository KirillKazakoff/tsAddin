import { Worksheet } from 'exceljs';
import { getCell } from '../utils/excelUtilsObj/getCell';

export type PictureRangeObjT = {
    start: string;
    end: string;
};

export const getPictureRange = (range: PictureRangeObjT, ws: Worksheet) => {
    const startCl = getCell(ws)(range.start);
    const endCl = getCell(ws)(range.end);

    return `${startCl.$col$row}:${endCl.$col$row}`;
};
