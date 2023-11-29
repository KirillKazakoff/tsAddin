import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { CommonRowT } from '../../../types/typesTables';
import tablesStore, { TableKeyT } from '../tablesStore';
import { headerRecognition, innerDictionary } from '../utils/headerRecognition';

export const setTable = <
    R extends CommonRowT,
    T extends Record<string, number>,
>(settings: {
    table: any[][];
    rowSettings: T;
    row: (row: Record<keyof T, string>) => Omit<R, 'type' | 'index'>;
    type: TableKeyT;
}) => {
    const { table, row: getRow, type } = settings;

    const headers = table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<R[]>((total, rowInit, i) => {
        try {
            const dictionary = headerRecognition(settings.rowSettings, headers);

            Object.keys(dictionary).forEach((key) => {
                const index = dictionary[key];
                dictionary[key] = rowInit[index];
            });

            const initObj = { index: i.toString(), type };
            const row = { ...getRow(dictionary as any), ...initObj };
            total.push(row as any);
        } catch (e) {
            return total;
        }
        return total;
    }, []);

    checkTable(transformedTable, type);
    tablesStore.setTable[type](transformedTable as any);

    return transformedTable;
};
