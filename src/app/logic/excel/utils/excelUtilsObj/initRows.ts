import {
    Cell, CellValue, Row, Worksheet,
} from 'exceljs';
import { DocTypeT, setFormats } from '../../../utils/formats';
import { getCellByName } from './getCell';
import { mergeCells } from './mergeCells';
import { mergeStyles } from '../mergeStyles';
import { RowStyleSettingsT, styleRowCells, styleCell } from '../styleRowCells';
import { createFormula } from '../createFormula';

type FieldsObjT = { [key: string]: string | number };
type FieldsGenT = FieldsObjT | string[] | number[];

type SettingsRowT<FieldsT> = {
    fields: FieldsT;
    docType?: DocTypeT;
    merge?: { start: number; end: number }[];
    style?: {
        common: RowStyleSettingsT;
        special?: Partial<{
            [P in keyof FieldsT]: {
                style?: Cell['style'];
                formulaCb?: (address: { col: string; row: string }) => string;
            };
        }>;
    };
};
type SettingsRowsT<RecordT, FieldsT> = {
    records: RecordT[];
    deleteStartAmount?: number;
    rowSettings?: (
        rec: RecordT,
        insertIndex: number,
        cycleIndex: number,
        row: Row
    ) => SettingsRowT<FieldsT>;
};

export const initRowMaker = (ws: Worksheet, cellName?: string) => {
    let insertIndex = 1;
    let firstCellCount = 1;
    if (cellName) {
        const arrayCl = getCellByName(ws, cellName);
        firstCellCount = ws.getColumn(arrayCl.col).number;
        insertIndex = +arrayCl.row;
    }

    const insertRow = <FieldsT extends FieldsGenT>(
        settings: SettingsRowT<FieldsT>,
    ) => {
        const rowArr = Object.values(settings.fields);
        const row = ws.insertRow(insertIndex, rowArr);
        insertIndex += 1;

        if (settings.merge) {
            settings.merge.forEach(({ start, end }) => {
                mergeCells(ws, {
                    startCol: start,
                    endCol: end,
                    row: row.number,
                });
            });
        }

        if (settings.style) {
            styleRowCells(row, settings.style.common, firstCellCount);

            if (settings.style.special) {
                Object.keys(settings.fields).forEach((fieldKey, cellIndex) => {
                    const cell = settings.style.special[fieldKey as keyof FieldsT];
                    if (!cell) return;

                    const cellObj = row.getCell(cellIndex);

                    const mergedStyle = mergeStyles(
                        settings.style.common,
                        cell.style,
                    );
                    if (cell.formulaCb) {
                        cellObj.value = createFormula({
                            cell: cellObj,
                            formulaCb: cell.formulaCb,
                            result: settings.fields[fieldKey],
                        });
                    }

                    styleCell(cellObj, mergedStyle);
                });
            }
        }

        if (settings.docType) {
            setFormats(row, settings.fields as FieldsObjT, settings.docType);
        }
    };

    const insertRows = <RecordT, FieldsT extends FieldsGenT>(
        settingsTmp: SettingsRowsT<RecordT, FieldsT>,
    ) => {
        settingsTmp.records.forEach((record, cycleIndex) => {
            const settings = settingsTmp.rowSettings
                ? settingsTmp.rowSettings(
                    record,
                    insertIndex + 1,
                    cycleIndex,
                    ws.getRow(insertIndex + 1),
                )
                : { fields: settingsTmp.records };

            if (!settings) return;

            insertRow(settings as SettingsRowT<FieldsT>);
        });
        if (settingsTmp.deleteStartAmount) {
            ws.spliceRows(insertIndex, settingsTmp.deleteStartAmount);
        }
    };

    const deleteStartRows = (amount: number) => {
        ws.spliceRows(insertIndex, amount);
    };

    return { insertRow, insertRows, deleteStartRows };
};

// import { Cell, CellValue, Worksheet } from 'exceljs';
// import { DocTypeT, setFormats } from '../../../utils/formats';
// import { getCellByName } from './getCell';
// import { mergeCells } from './mergeCells';
// import { mergeStyles } from '../mergeStyles';
// import { RowStyleSettingsT, styleRowCells, styleCell } from '../styleRowCells';

// type FieldsGenT = { [key: string]: string | number } | string[] | number[];

// type SettingsRowT<FieldsT> = {
//     fields: FieldsT;
//     docType?: DocTypeT;
//     merge?: { start: number; end: number }[];
//     style?: {
//         common: RowStyleSettingsT;
//         special?: {
//             [P in keyof FieldsT]: {
//                 index: number | 'last';
//                 style: Cell['style'];
//                 value?: CellValue;
//             };
//         };
//     };
// };
// type SettingsRowsT<RecordT, FieldsT> = {
//     records: RecordT[];
//     deleteStartAmount?: number;
//     rowSettings?: (
//         rec: RecordT,
//         insertIndex: number,
//         cycleIndex: number
//     ) => SettingsRowT<FieldsT>;
// };

// export const initRowMaker = (ws: Worksheet, cellName?: string) => {
//     let insertIndex = 1;
//     let firstCellCount = 1;
//     if (cellName) {
//         const arrayCl = getCellByName(ws, cellName);
//         firstCellCount = ws.getColumn(arrayCl.col).number;
//         insertIndex = +arrayCl.row;
//     }

//     const insertRow = <FieldsT extends FieldsGenT>(settings: SettingsRowT<FieldsT>) => {
//         const rowArr = Object.values(settings.fields);
//         const row = ws.insertRow(insertIndex, rowArr);
//         insertIndex += 1;

//         if (settings.merge) {
//             settings.merge.forEach(({ start, end }) => {
//                 mergeCells(ws, {
//                     startCol: start,
//                     endCol: end,
//                     row: row.number,
//                 });
//             });
//         }

//         if (settings.style) {
//             styleRowCells(row, settings.style.common, firstCellCount);

//             if (settings.style.special) {
//                 settings.style.special.forEach((cell) => {
//                     if (cell.index === 0) return;
//                     const cellIndex = cell.index === 'last' ? row.cellCount : cell.index;

//                     const cellObj = row.getCell(cellIndex);
//                     if (cellObj) {
//                         const mergedStyle = mergeStyles(
//                             settings.style.common,
//                             cell.style,
//                         );
//                         cellObj.value = cell.value;
//                         styleCell(cellObj, mergedStyle);
//                     }
//                 });
//             }
//         }

//         if (settings.docType) {
//             setFormats(row, settings.fields as FieldsT, settings.docType);
//         }
//     };

//     const insertRows = <RecordT>(settingsTmp: SettingsRowsT<RecordT>) => {
//         settingsTmp.records.forEach((record, cycleIndex) => {
//             const settings = settingsTmp.rowSettings
//                 ? settingsTmp.rowSettings(record, insertIndex + 1, cycleIndex)
//                 : { fields: settingsTmp.records };

//             if (!settings) return;

//             insertRow(settings as SettingsRowT);
//         });
//         if (settingsTmp.deleteStartAmount) {
//             ws.spliceRows(insertIndex, settingsTmp.deleteStartAmount);
//         }
//     };

//     const deleteStartRows = (amount: number) => {
//         ws.spliceRows(insertIndex, amount);
//     };

//     return { insertRow, insertRows, deleteStartRows };
// };
