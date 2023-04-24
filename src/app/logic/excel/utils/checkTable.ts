/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { tableError } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { AmountT, CommonRowT } from '../../../types/typesTables';

export type TableNameT = 'Export' | 'Export_Storage' | 'Inner' | 'Mates';

export const checkEmptyTable = (table: any[][]) => {
    const check = table[0].every((value) => !value || value === '-');
    return check;
};

const setTableError = (row: number, prop: string, tableName: string) => {
    pageStatusStore.setPageStatus(tableError({ tableName, row, prop }));
};

const checkAmountPropError = (
    amountObj: { [key: string]: AmountT },
    row: number,
    tableName: string,
) => {
    const propError = Object.keys(amountObj).find((key) => {
        return amountObj[key].str === 'не число';
    });

    if (propError) {
        setTableError(row, propError, tableName);
    }
};

export const checkNotFulfilledRow = (row: CommonRowT, tableName: TableNameT) => {
    const checkProps = (possibleEmptyProps: string[]) => {
        for (const prop in row) {
            const value = row[prop];

            if (!value && !possibleEmptyProps.includes(prop)) {
                setTableError(+row.index + 1, prop, tableName);
                return;
            }
        }
        checkAmountPropError(row.amount, +row.index + 1, tableName);
    };

    if (tableName.includes('Export')) {
        const possibleEmptyProps = ['terms', 'sort', 'msc', 'consignee'];
        checkProps(possibleEmptyProps);
    }
    if (tableName === 'Mates') {
        const possibleEmptyProps = ['sort', 'periodCreation'];
        checkProps(possibleEmptyProps);
    }
    if (tableName === 'Inner') {
        const possibleEmptyProps = ['sort'];
        checkProps(possibleEmptyProps);
    }
};
