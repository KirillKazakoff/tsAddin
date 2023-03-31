import ExcelJS, { Cell } from 'exceljs';
import { AgreementT } from '../logic/docs/exportContract/groupByAggrementNo';

export type InputEventT = React.SyntheticEvent<HTMLInputElement>;

export type CellDouble = {
    cellEng: Cell;
    cellRus: Cell;
};

export type GetCellBoundT = (name: string) => CellDouble;

export type SetObjT = {
    cell: string;
    eng: string;
    ru: string;
};

export type SetCellBoundT = (setObj: SetObjT) => void;

export type InitExportPartT = (
    getCell: GetCellBoundT,
    agreement: AgreementT
) => void;

type InitPartObjT = {
    setCell: SetCellBoundT;
    getCell: GetCellBoundT;
};

export type InitExportContractPartT = (
    utils: InitPartObjT,
    agreement: AgreementT
) => void;

export type InitExportComInvoicePartT = (utils: InitPartObjT) => void;
