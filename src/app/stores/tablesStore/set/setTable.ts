/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { checkRow } from '../../../logic/excel/checkTable/checkRow';
import { excludeOfEmptyRows } from '../../../logic/excel/checkTable/excludeOfEmptyRows';
import tablesStore, { TableKeyT } from '../tablesStore';
import { headerRecognition } from '../../headerRecognition';
import { CommonRowT } from '../../../types/typesTables';

export const setTable = <
    T extends Record<string, any>,
    K extends TableKeyT,
    R,
>(settings: {
    table: any[][];
    headers: T;
    type: K;
    row: (row: Record<keyof T, any>) => R;
}) => {
    const { table, row: getRow, type } = settings;

    const headers = table.shift();
    const excluded = excludeOfEmptyRows(table);
    const dictionary = headerRecognition(settings.headers, headers, type, 'table');

    const transformedTable = excluded.reduce<(R & CommonRowT)[]>((total, rowInit, i) => {
        const dictionaryCopy = _.cloneDeep(dictionary);
        try {
            Object.keys(dictionary).forEach((key) => {
                const index = dictionaryCopy[key];
                dictionaryCopy[key as keyof typeof settings.headers] = rowInit[index];
            });

            const initObj = { index: i.toString(), type };
            const row = { ...getRow(dictionaryCopy as any), ...initObj };

            checkRow(row, type, i);
            total.push(row as any);
        } catch (e) {
            console.log(e);
            return total;
        }
        return total;
    }, [] as any);

    tablesStore.setTable(transformedTable, type);
    return transformedTable;
};
