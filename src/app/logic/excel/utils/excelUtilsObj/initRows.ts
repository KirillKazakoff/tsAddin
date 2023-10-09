import { Cell, Worksheet } from 'exceljs';
import { DocTypeT, setFormats } from '../../../utils/formats';
import { getCellByName } from './getCell';
import {
    RowStyleSettingsT,
    styleCell,
    styleRowCells,
} from '../../../docs/styleRowCells';
import { mergeCells } from './mergeCells';

type FieldsT = { [key: string]: string | number };
type SettingsRowT = {
    fields: FieldsT | string[] | number[];
    docType?: DocTypeT;
    merge?: { start: number; end: number }[];
    style?: {
        common: RowStyleSettingsT;
        special?: { index: number | 'last'; style: Cell['style'] }[];
    };
};
type SettingsRowsT<RecordT> = {
    records: RecordT[];
    deleteStartAmount?: number;
    rowSettings: (rec: RecordT, insertIndex: number) => SettingsRowT;
};

export const initRowMaker = (ws: Worksheet, cellName: string) => {
    const arrayCl = getCellByName(ws, cellName);
    let insertIndex = +arrayCl.row;

    const insertRow = (settings: SettingsRowT) => {
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
            styleRowCells(row, settings.style.common);

            if (settings.style.special) {
                settings.style.special.forEach((cell) => {
                    const cellIndex = cell.index === 'last' ? row.cellCount : cell.index;

                    const cellObj = row.getCell(cellIndex);
                    const mergedStyle = { ...settings.style.common, ...cell.style };
                    styleCell(cellObj, mergedStyle);
                });
            }
        }

        if (settings.docType) {
            setFormats(row, settings.fields as FieldsT, settings.docType);
        }
    };

    const insertRows = <RecordT>(settingsTmp: SettingsRowsT<RecordT>) => {
        settingsTmp.records.forEach((record) => {
            const settings = settingsTmp.rowSettings(record, insertIndex + 1);
            if (!settings) return;

            insertRow(settings);
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
