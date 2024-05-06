import { Worksheet } from 'exceljs';
import { getRow } from './getRow';
import { getCellSingle, getCellDouble } from './getCell';
import { setCellSingle, setCellDouble } from './setCell';
import { deleteRow } from './deleteRow';
import { mergeCells, mergeFromTo } from './mergeCells';
import { initPicturesExcel } from '../../pictures/initPictureExcel';
import { initRowMaker } from './initRows';
import { initTmp } from './initTmp';
import { setPrintArea } from './setPrintArea';

type ResT<
    T1,
    T2 extends (ws: Worksheet) => unknown,
    T3 extends (ws: Worksheet, offsetCol: string) => unknown,
> = T1 extends '' ? ReturnType<T2> : T1 extends string ? ReturnType<T3> : never;

const getUtilsCb: <
    T1 extends '' | string,
    T2 extends (ws: Worksheet) => unknown,
    T3 extends (ws: Worksheet, offsetCol: string) => unknown,
>(
    ws: Worksheet,
    cbSingle: T2,
    cbDouble: T3,
    offsetCol?: T1
) => ResT<T1, T2, T3> = (ws, cbSingle, cbDouble, offsetCol) => {
    const cb = offsetCol === '' ? cbSingle(ws) : cbDouble(ws, offsetCol);
    return cb as any;
};

// eslint-disable-next-line no-underscore-dangle
const _initExcelUtils = <T extends string>(ws: Worksheet, offsetCell: T) => {
    return {
        ws,
        book: ws.workbook,
        getRow: getRow(ws),
        mergeCells: mergeCells(ws),
        mergeFromTo: mergeFromTo(ws),
        deleteRow: deleteRow(ws),
        getCell: getUtilsCb(ws, getCellSingle, getCellDouble, offsetCell),
        setCell: getUtilsCb(ws, setCellSingle, setCellDouble, offsetCell),
        initPictures: initPicturesExcel(ws),
        initRowMaker: initRowMaker(ws),
    };
};

export const initExcelUtils = <T extends string>(ws: Worksheet, offsetCell: T) => {
    const utilsMain = _initExcelUtils(ws, offsetCell);
    return {
        ...utilsMain,
        initTmp: initTmp(utilsMain),
        setPrintArea: setPrintArea(utilsMain),
    };
};

export type _CellUtilsT<T extends string> = ReturnType<typeof _initExcelUtils<T>>;
export type CellUtilsT<T extends string> = ReturnType<typeof initExcelUtils<T>>;
