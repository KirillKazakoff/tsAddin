import { CellValue } from 'exceljs';

type Common = {
    cell: string;
    offsetRow?: number;
    numFmt?: string;
    isEmpty?: boolean;
};

export type CellObjDoubleT = Common & {
    eng: CellValue;
    ru: CellValue;
};

export type CellObjT = Common & {
    value: CellValue;
};
