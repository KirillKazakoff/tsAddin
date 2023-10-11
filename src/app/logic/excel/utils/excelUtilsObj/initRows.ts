import { Cell, Row, Worksheet } from 'exceljs';
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
            const commonStyle = styleRowCells(
                row,
                settings.style.common,
                firstCellCount,
            );

            if (settings.style.special) {
                Object.keys(settings.fields).forEach((fieldKey, cellIndex) => {
                    const cell = settings.style.special[fieldKey as keyof FieldsT];
                    if (!cell) return;

                    const cellObj = row.getCell(1 + cellIndex);

                    const mergedStyle = mergeStyles(commonStyle, cell.style);
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
                    ws.getRow(insertIndex),
                )
                : { fields: record };

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

    const getIndex = () => insertIndex;

    return {
        insertRow,
        insertRows,
        deleteStartRows,
        getIndex,
    };
};

export type RowMakerT = ReturnType<typeof initRowMaker>;
