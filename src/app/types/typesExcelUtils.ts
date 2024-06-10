/* eslint-disable no-use-before-define */
import {
    Alignment, Cell, CellValue, Fill, Font,
} from 'exceljs';

type ExcelCellT = {
    numFmt?: string;
    fill?: Fill;
    alignment?: Partial<Alignment>;
    font?: Partial<Font>;
};

export type CellSettingsCommonT = {
    name?: string;
    redefineCell?: {
        cell: CellObjT;
        cellRu?: CellObjT;
        commonStyles?: ExcelCellT;
        offset: {
            x: number;
            y: number;
        };
    };
    deleteRows?: {
        onlyParent?: boolean;
        start?: number;
        end?: number;
    };
    offsetRow?: number;
    isEmptyCell?: boolean;
    height?: number;
} & ExcelCellT;

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

export type CellDeclarationT<CellT> = { [key: string]: CellT[] };
