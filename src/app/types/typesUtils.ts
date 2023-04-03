import ExcelJS, { Cell, Worksheet } from 'exceljs';
import { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import { InvoiceT } from './typesContract';

export type InputEventT = React.SyntheticEvent<HTMLInputElement>;

// Cell utils
export type CellDouble = {
    cellEng: Cell;
    cellRus: Cell;
};

export type GetCellDoubleBoundT = (name: string) => CellDouble;

export type CellObjDoubleT = {
    cell: string;
    eng: string;
    ru: string;
};

export type SetCellDoubleBoundT = (setObj: CellObjDoubleT) => void;

export type InitExportPartT = (
    getCell: GetCellDoubleBoundT,
    agreement: AgreementT
) => void;

// Utils Double
export type CellUtilsDoubleT = {
    ws: Worksheet;
    setCell: SetCellDoubleBoundT;
    getCell: GetCellDoubleBoundT;
};

// Utils solo
export type GetCellBoundT = (name: string) => ExcelJS.Cell;
export type CellObjT = {
    cell: string;
    value: string;
};
export type SetCellBoundT = (setObj: CellObjT) => void;
export type CellUtilsT = {
    ws: Worksheet;
    getCell: GetCellBoundT;
    setCell: SetCellBoundT;
};

export type InitContractPartT = (
    utils: CellUtilsDoubleT,
    agreement: AgreementT
) => void;

export type InitInvoiceT = (utils: CellUtilsT, invoice: InvoiceT) => void;
