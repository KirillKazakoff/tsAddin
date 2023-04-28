import { Worksheet } from 'exceljs';
import { initExcelUtils } from '../utils/excelUtilsObj/initExcelUtils';

export const getPictureRange = (start: string, end: string, ws: Worksheet) => {
    const utils = initExcelUtils(ws);

    const startCl = utils.getCell(start);
    const endCl = utils.getCell(end);

    return `${startCl.$col$row}:${endCl.$col$row}`;
};
