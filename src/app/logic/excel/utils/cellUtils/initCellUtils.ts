import { Worksheet } from 'exceljs';
import { CellUtilsDoubleT, CellUtilsT } from '../../../../types/typesUtils';
import { getCellByName, getCellsObj } from './getCellByName';
import { setCell, setCellDouble } from './setCell';

export const initCellUtils = (ws: Worksheet) => {
    return {
        getCell: getCellsObj.bind(this, ws),
        setCell: setCellDouble.bind(this, ws),
    } as CellUtilsT;
};

export const initCellUtilsDouble = (ws: Worksheet) => {
    return {
        getCell: getCellByName.bind(this, ws),
        setCell: setCell.bind(this, ws),
    } as CellUtilsDoubleT;
};
