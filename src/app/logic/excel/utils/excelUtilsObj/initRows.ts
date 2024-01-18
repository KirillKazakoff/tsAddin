import { Cell, Row, Worksheet } from 'exceljs';
import { DocTypeT, setDynamicFormats, setFormats } from '../formats';
import { getCell } from './getCell';
import { mergeRowCells } from './mergeCells';
import { RowStyleSettingsT, styleRow } from '../styleRowCells';

type FieldsObjT = { [key: string]: string | number };
export type FieldsGenT = FieldsObjT | string[] | number[];

export type SettingsRowT<FieldsT> = {
    fields: FieldsT;
    docType?: DocTypeT;
    dynamicFormats?: { [P in keyof FieldsT]?: string };
    style?: {
        common: RowStyleSettingsT;
        special?: {
            [P in keyof FieldsT]?: {
                style?: Cell['style'];
                formulaCb?: (address: { col: string; row: string }) => string;
            };
        };
    };
};

type SettingsRowsT<RecordT, FieldsT> = {
    records: RecordT[];
    deleteStartAmount?: number;
    mergeHeader?: boolean;
    rowSettings?: (
        rec: RecordT,
        insertIndex: number,
        cycleIndex: number,
        row: Row
    ) => SettingsRowT<FieldsT>;
};

type RowMakerSettingsT = {
    cellName?: string;
    rowIndex?: number;
    firstCol?: number;
};

export const initRowMaker = (ws: Worksheet) => (setup?: RowMakerSettingsT) => {
    let insertIndex = setup?.rowIndex || 1;
    let firstCellCount = setup?.firstCol || 1;

    if (setup?.cellName) {
        const arrayCl = getCell(ws)(setup?.cellName);
        firstCellCount = ws.getColumn(arrayCl.col).number;
        insertIndex = +arrayCl.row;
    }

    const insertRow = <FieldsT extends FieldsGenT>(settings: SettingsRowT<FieldsT>) => {
        const rowArr = Object.values(settings.fields);
        const row = ws.insertRow(insertIndex, rowArr);
        insertIndex += 1;

        styleRow(settings, row, firstCellCount);
        setFormats(row, settings.fields as FieldsObjT, settings.docType);
        setDynamicFormats(settings.fields as FieldsObjT, settings.dynamicFormats, row);
        mergeRowCells(ws, settings.fields, row.number);
    };

    const insertRows = <RecordT, FieldsT extends FieldsGenT>(
        settingsTmp: SettingsRowsT<RecordT, FieldsT>,
    ) => {
        settingsTmp.records.forEach((record, cycleIndex) => {
            const row = ws.getRow(insertIndex);
            const settings = settingsTmp.rowSettings
                ? settingsTmp.rowSettings(record, insertIndex + 1, cycleIndex, row)
                : { fields: record };

            if (!settings) return;

            if (cycleIndex === 0 && settingsTmp.mergeHeader) {
                styleRow(settings as any, row, firstCellCount);
                mergeRowCells(ws, settings.fields as FieldsGenT, insertIndex - 1);
            }

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

export type RowMakerT = ReturnType<ReturnType<typeof initRowMaker>>;
