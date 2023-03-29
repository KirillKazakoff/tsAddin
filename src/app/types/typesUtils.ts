import ExcelJS, { Cell } from 'exceljs';
import { AgreementT } from '../logic/docs/exportContract/groupByAggrementNo';

export type InputEventT = React.SyntheticEvent<HTMLInputElement>;

export type CellDouble = {
    cellEng: Cell;
    cellRus: Cell;
};

export type GetCellBoundT = (name: string) => CellDouble;

export type InitExportPart = (getCell: GetCellBoundT, agreement: AgreementT) => void;