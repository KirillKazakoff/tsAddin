/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
    TableErrorT,
    tableError,
} from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { CommonRowT } from '../../../types/typesTables';
import { getNonObligatoryProps } from './getNonObligatoryProps';

export const checkRowProps = (row: CommonRowT, tableName: string) => {
    const nonObligatoryProps = getNonObligatoryProps(row, tableName);

    for (const prop in row) {
        if (nonObligatoryProps.includes(prop)) return;

        const value = row[prop];
        if (!value) {
            const error: TableErrorT = {
                row: +row.index + 1,
                prop,
                tableName,
                desc: 'Пустая ячейка или ошибка в БД.',
            };
            pageStatusStore.setPageStatus(tableError(error));
            return;
        }
    }
};
