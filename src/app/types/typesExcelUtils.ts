import { Cell, Row, Worksheet } from 'exceljs';
import { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import { InvoiceT } from './typesContract';

export type GetRowBoundT = (cellName: string, offset: number) => Row;
export type DeleteRowBoundT = (cellName: string) => void;

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

export type SetCellDoubleBoundT = (setObj: CellObjDoubleT) => CellObjDoubleT;

// Utils Double
export type CellUtilsDoubleT = {
    ws: Worksheet;
    getRow: GetRowBoundT;
    deleteRow: DeleteRowBoundT;
    setCell: SetCellDoubleBoundT;
    getCell: GetCellDoubleBoundT;
};

// Utils solo
export type GetCellBoundT = (name: string) => Cell;
export type CellObjT = {
    cell: string;
    value: string;
};
export type SetCellBoundT = (setObj: CellObjT) => Cell;
export type CellUtilsT = {
    ws: Worksheet;
    getRow: GetRowBoundT;
    deleteRow: DeleteRowBoundT;
    getCell: GetCellBoundT;
    setCell: SetCellBoundT;
};

// InitPart
export type InitExportPartT = (
    getCell: GetCellDoubleBoundT,
    agreement: AgreementT
) => void;

export type InitContractPartT = (
    utils: CellUtilsDoubleT,
    agreement: AgreementT
) => void;

export type InitInvoicePartT = (utils: CellUtilsT, invoice: InvoiceT) => void;