import { Worksheet } from 'exceljs';
import { getRow } from './getRow';
import { getCell, getCellDouble } from './getCell';
import { setCell, setCellDouble } from './setCell';
import { deleteRow } from './deleteRow';
import { mergeCells, mergeFromTo } from './mergeCells';
import { initPicturesExcel } from '../../pictures/initPictureExcel';
import { initRowMaker } from './initRows';

type ResT<
    T1,
    T2 extends (ws: Worksheet) => unknown,
    T3 extends (ws: Worksheet, offsetCol?: number) => unknown,
> = T1 extends 0 ? ReturnType<T2> : T1 extends number ? ReturnType<T3> : never;

const getUtilsCb: <
    T1 extends 0 | number,
    T2 extends (ws: Worksheet) => unknown,
    T3 extends (ws: Worksheet, offsetCol?: number) => unknown,
>(
    ws: Worksheet,
    cbSingle: T2,
    cbDouble: T3,
    offsetCol?: T1
) => ResT<T1, T2, T3> = (ws, cbSingle, cbDouble, offsetCol) => {
    const cb = offsetCol === 0 ? cbSingle(ws) : cbDouble(ws, offsetCol);
    return cb as any;
};

export const initExcelUtils = <T extends number>(ws: Worksheet, offsetCol: T) => {
    return {
        ws,
        getRow: getRow(ws),
        mergeCells: mergeCells(ws),
        mergeFromTo: mergeFromTo(ws),
        deleteRow: deleteRow(ws),
        getCell: getUtilsCb(ws, getCell, getCellDouble, offsetCol),
        setCell: getUtilsCb(ws, setCell, setCellDouble, offsetCol),
        initPictures: initPicturesExcel(ws),
        initRowMaker: initRowMaker(ws),
    };
};
export type CellUtilsT<T extends number> = ReturnType<typeof initExcelUtils<T>>;
