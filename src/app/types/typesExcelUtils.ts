import { Cell, CellValue } from 'exceljs';

type CellSettingsT = {
    name: string;
    offsetRow?: number;
    numFmt?: string;
    isEmptyTitle?: boolean;
    isEmptyCell?: boolean;
    height?: number;
    deleteRows?: {
        onlyParent?: boolean;
        start?: number;
        end?: number;
    };
};

export type CellObjDoubleT = CellSettingsT & {
    eng: CellValue;
    ru: CellValue;
};

export type CellObjT = CellSettingsT & {
    value: CellValue;
};

export type CellFullT = {
    settings: CellSettingsT & { value: CellValue };
    cell: Cell;
};
