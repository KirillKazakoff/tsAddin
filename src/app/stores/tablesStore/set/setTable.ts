import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import { CommonRowT } from '../../../types/typesTables';
import tablesStore, { TableKeyT } from '../tablesStore';

export const setTable = <R extends CommonRowT>(settings: {
    table: any[][];
    row: (row: any[]) => Omit<R, 'type' | 'index'>;
    // afterRowInit?: (row: R) => void;
    type: TableKeyT;
}) => {
    const { table, row: getRow, type } = settings;

    const excluded = excludeOfEmptyRows(table);

    const transformedTable = excluded.reduce<R[]>((total, rowInit, i) => {
        try {
            const initObj = { index: i.toString(), type };
            const row = { ...getRow(rowInit), ...initObj };
            // if (settings?.afterRowInit) {
            // settings.afterRowInit(row as R);
            // }
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
