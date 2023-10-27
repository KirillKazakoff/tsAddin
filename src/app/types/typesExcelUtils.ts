import { Cell } from 'exceljs';

export type CellDouble = {
    cellEng: Cell;
    cellRus: Cell;
};

export type CellObjDoubleT = {
    cell: string;
    eng: string | number;
    ru: string | number;
    offsetRow?: number;
    numFmt?: string;
};

export type CellObjT = {
    cell: string;
    value: string | number;
    numFmt?: string;
    offsetRow?: number;
};

// type ResT<T> = T extends 0
//     ? ReturnType<typeof getCellByName>
//     : T extends number
//         ? ReturnType<typeof getCellsObj>
//         : never;
