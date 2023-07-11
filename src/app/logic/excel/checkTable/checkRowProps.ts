import {
    TableErrorT,
    tableError,
} from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { CommonRowT } from '../../../types/typesTables';
import { getNonObligatoryProps } from './getNonObligatoryProps';

export const checkRowProps = (row: CommonRowT, tableName: string) => {
    const nonObligatoryProps = getNonObligatoryProps(row, tableName);

    const keys = Object.keys(row);

    keys.forEach((prop) => {
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
        }
    });
};
