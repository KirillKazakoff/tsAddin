import { Worksheet } from 'exceljs';
import { initExcelUtils } from '../utils/excelUtilsObj/initExcelUtils';

export type PictureRangeObjT = {
    start: string;
    end: string;
};

export const getPictureRange = (range: PictureRangeObjT, ws: Worksheet) => {
    const utils = initExcelUtils(ws);

    const startCl = utils.getCell(range.start);
    const endCl = utils.getCell(range.end);

    return `${startCl.$col$row}:${endCl.$col$row}`;
};
