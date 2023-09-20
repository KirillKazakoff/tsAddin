import tablesStore, { TableKeyT } from '../../../stores/tablesStore/tablesStore';
import {
    initTableStatus,
    tableEmpty,
    tableError,
} from '../../../stores/tablesStore/utils/tableStatus';
import { CommonRowT } from '../../../types/typesTables';
import { getNonObligatoryProps } from './getNonObligatoryProps';

export const checkTable = (table: CommonRowT[], tableName: TableKeyT) => {
    if (table.length === 0) {
        tablesStore.setStatus(tableEmpty(tableName), tableName);
    }

    const isError = table.some((row) => {
        const nonObligatoryProps = getNonObligatoryProps(row, tableName);

        const keys = Object.keys(row);
        const errorProp = keys.find((prop) => {
            if (nonObligatoryProps.includes(prop)) return false;

            const value = row[prop];
            if (!value) return prop;

            return false;
        });

        if (errorProp) {
            const error = tableError({
                row: +row.index + 1,
                prop: errorProp,
                tableName,
                desc: 'Пустая ячейка или ошибка в БД.',
            });
            tablesStore.setStatus(error, tableName);
            return true;
        }
        return false;
    });

    if (!isError) {
        tablesStore.setStatus(initTableStatus(), tableName);
    }
};
