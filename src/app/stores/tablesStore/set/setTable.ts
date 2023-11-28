import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { CommonRowT } from '../../../types/typesTables';
import tablesStore, { TableKeyT } from '../tablesStore';
import { headerRecognition } from '../utils/headerRecognition';

export const setTable = <R extends CommonRowT>(settings: {
    table: any[][];
    row: (row: any) => Omit<R, 'type' | 'index'>;
    type: TableKeyT;
}) => {
    const { table, row: getRow, type } = settings;

    const headers = table.shift();
    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<R[]>((total, rowInit, i) => {
        try {
            // if (type === 'inner') {
            //     const dictionary = headerRecognition(headers);

            //     Object.keys(dictionary).forEach((key) => {
            //         const index = dictionary[key];
            //         dictionary[key] = rowInit[index];
            //     });

            //     const initObj = { index: i.toString(), type };
            //     const row = { ...getRow(dictionary), ...initObj };
            //     total.push(row as any);
            // }

            const initObj = { index: i.toString(), type };
            const row = { ...getRow(rowInit), ...initObj };
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
