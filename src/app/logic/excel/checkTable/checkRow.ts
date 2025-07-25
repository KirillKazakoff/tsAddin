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
        if (tableName === 'customsT') return;
        if (tableName === 'certificatesT') return;

        popupStore.pushStatus({
            title: `Ошибка в таблице ${tableName}`,
            desc: `Не заполнена строка ${i + 1}, столбец "${errorProp.toUpperCase()}"`,
        });
        throw new Error(`error table prop ${errorProp} in ${tableName}, row ${i + 1}`);
    }
};
