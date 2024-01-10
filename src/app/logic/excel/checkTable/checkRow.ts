import popupStore from '../../../stores/popupStore.ts/popupStore';
import { TableKeyT } from '../../../stores/tablesStore/tablesStore';
import { CommonRowT } from '../../../types/typesTables';
import { getNonObligatoryProps } from './getNonObligatoryProps';

export const checkRow = (row: CommonRowT, tableName: TableKeyT, i: number) => {
    const nonObligatoryProps = getNonObligatoryProps(row, tableName);

    const keys = Object.keys(row);
    const errorProp = keys.find((prop) => {
        if (nonObligatoryProps.includes(prop)) return false;

        const value = row[prop];
        if (!value) return prop;

        return false;
    });

    if (errorProp) {
        popupStore.setStatus({
            title: `Ошибка в таблице ${tableName}`,
            desc: `Не заполнена строка ${i}, столбец "${errorProp.toUpperCase()}"`,
        });
        throw new Error(`problem with table prop ${errorProp}`);
    }
};
