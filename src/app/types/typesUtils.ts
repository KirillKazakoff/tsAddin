import ExcelJS, { Cell } from 'exceljs';

export type InputEventT = React.SyntheticEvent<HTMLInputElement>;

export type CellDouble = {
    cellEng: Cell;
    cellRus: Cell;
};

export type GetCellBoundT = (name: string) => CellDouble;
