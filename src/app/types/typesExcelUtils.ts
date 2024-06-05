import { Cell, CellValue } from 'exceljs';

type PartialSettingsT = Partial<{
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
}>;

export type CellSettingsT = {
    name: string;
} & PartialSettingsT;

export type CellObjDoubleT = CellSettingsT & {
    eng?: CellValue;
    ru?: CellValue;
};

export type CellObjT = CellSettingsT & {
    value: CellValue;
};

export type CellFullT = {
    settings: CellSettingsT & { value: CellValue };
    cell: Cell;
};
