/* eslint-disable no-use-before-define */
import {
    Alignment, Cell, CellValue, Fill, Font,
} from 'exceljs';

type PartialSettingsT = Partial<{
    offsetRow?: number;
    numFmt?: string;
    isEmptyCell?: boolean;
    height?: number;
    deleteRows?: {
        onlyParent?: boolean;
        start?: number;
        end?: number;
    };
    fill?: Fill;
    alignment?: Alignment;
    font?: Font;
}>;

export type CellSettingsCommonT = {
    name?: string;
    defineCell?: {
        cell: CellObjT;
        cellRu?: CellObjT;
        offset: {
            x: number;
            y: number;
        };
    };
} & PartialSettingsT;

export type CellObjDoubleT = CellSettingsCommonT & {
    eng?: CellValue;
    ru?: CellValue;
};

export type CellObjT = CellSettingsCommonT & {
    value: CellValue;
};

export type CellFullT = {
    settings: CellSettingsCommonT & { value: CellValue };
    cell: Cell;
};
