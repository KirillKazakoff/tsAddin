/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import spsStore, { SpsKeyT } from '../spsStore';
import { headerRecognition } from '../../headerRecognition';

export const setSp = <
    T extends Record<string, string>,
    K extends SpsKeyT,
    R extends { code: string },
>(settings: {
    table: any[][];
    headers: T;
    type: K;
    row: (row: Record<keyof T, any>) => R;
}) => {
    const { table, row: getRow, type: spsKey } = settings;
    const headers = table.shift();
    const dictionary = headerRecognition(settings.headers, headers, spsKey, 'sp');

    const transformedTable = table.reduce<Record<string, R>>((total, rowInit) => {
        const dictionaryCopy = _.cloneDeep(dictionary);
        Object.keys(dictionary).forEach((key) => {
            const index = dictionaryCopy[key];
            dictionaryCopy[key as keyof typeof settings.headers] = rowInit[index];
        });

        const row = getRow(dictionaryCopy as any);

        total[row.code] = row;
        return total;
    }, {});

    spsStore.setSp(transformedTable, spsKey);
    return transformedTable;
};
