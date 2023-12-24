/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import { checkTable } from '../../../logic/excel/checkTable/checkTable';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import tablesStore, { TableKeyT } from '../tablesStore';
import { headerRecognition } from '../../headerRecognition';

export const setTable = <T extends Record<string, any>, K extends TableKeyT>(settings: {
    table: any[][];
    headers: T;
    type: K;
    row: (
        row: Record<keyof T, any>
    ) => Omit<ReturnType<(typeof tablesStore.setTable)[K]>[number], 'index' | 'type'>;
}) => {
    const { table, row: getRow, type } = settings;

    type RowT = ReturnType<(typeof tablesStore.setTable)[K]>[number];

    const headers = table.shift();
    const excluded = excludeOfEmptyRows(table);
    const dictionary = headerRecognition(settings.headers, headers);

    const transformedTable = excluded.reduce<RowT[]>((total, rowInit, i) => {
        const dictionaryCopy = _.cloneDeep(dictionary);
        try {
            Object.keys(dictionary).forEach((key) => {
                const index = dictionaryCopy[key];
                dictionaryCopy[key as keyof typeof settings.headers] = rowInit[index];
            });

            const initObj = { index: i.toString(), type };
            const row = { ...getRow(dictionaryCopy as any), ...initObj };
            total.push(row as any);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return total;
        }
        return total;
    }, []);

    checkTable(transformedTable, type);
    tablesStore.setTable[type](transformedTable as any);

    return transformedTable;
};
