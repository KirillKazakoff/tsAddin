import {
    Cell, Row, Workbook, Worksheet,
} from 'exceljs';
import { AgreementT } from '../logic/docs/exportContract/groupBy/initAgreement';
import { MergeSettingsT } from '../logic/excel/utils/excelUtilsObj/mergeCells';
import { LanguageT } from './typesLetter';
import { InvoicesT, InvoiceT } from './typesContract';

export type GetRowBoundT = (cellName: string, offsetRow: number) => Row;
export type DeleteRowBoundT = (cellName: string, offsetRow?: number) => void;
export type MergeCellsBoundT = (settings: MergeSettingsT) => void;

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
    offsetRow?: number;
};

export type SetCellDoubleBoundT = (setObj: CellObjDoubleT) => CellDouble;

// Utils Double
export type CellUtilsDoubleT = {
    ws: Worksheet;
    getRow: GetRowBoundT;
    deleteRow: DeleteRowBoundT;
    mergeCells: MergeCellsBoundT;
    setCell: SetCellDoubleBoundT;
    getCell: GetCellDoubleBoundT;
};

// Utils solo
export type GetCellBoundT = (name: string) => Cell;
export type CellObjT = {
    cell: string;
    value: string;
    offsetRow?: number;
};
export type SetCellBoundT = (setObj: CellObjT) => Cell;
export type CellUtilsT = {
    ws: Worksheet;
    getRow: GetRowBoundT;
    deleteRow: DeleteRowBoundT;
    mergeCells: MergeCellsBoundT;
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
export type InitInvoicePartLanguageT = (
    utils: CellUtilsT,
    invoice: InvoiceT,
    language: LanguageT
) => void;

export type InitExportContractTmp = (book: Workbook, agreement: AgreementT) => void;

export type InvoicesTmpsSettingsT = {
    book: Workbook;
    sheetName: string;
    initInvoiceTmpCb: (ws: Worksheet, invoice: InvoiceT) => void;
    invoices: InvoicesT;
};
