/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { tableError } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { CommonRowT, TableNameT } from '../../../types/typesTables';
import { isNumber } from '../../utils/isNumber';

export const checkEmptyTable = (table: any[][]) => {
    const check = table[0].every(
        (value) => !value || value === '-' || value === ' ',
    );
    return check;
};

// checkFulfilledRow
const setTableError = (row: number, prop: string, tableName: string) => {
    pageStatusStore.setPageStatus(tableError({ tableName, row, prop }));
};

export const checkNotFulfilledRow = (row: CommonRowT, tableName: TableNameT) => {
    const checkProps = (possibleEmptyProps: string[]) => {
        // checkEmpty
        for (const prop in row) {
            const value = row[prop];

            if (!value && !possibleEmptyProps.includes(prop)) {
                setTableError(+row.index + 1, prop, tableName);
                return;
            }
        }

        // checkAmountError
        if (typeof row.amount === 'number') {
            if (!isNumber(row.amount)) {
                setTableError(+row.index + 1, 'amount', tableName);
            }
        } else {
            const keys = Object.keys(row.amount);

            const propError = keys.find((key) => {
                const { count } = row.amount[key];
                return isNumber(count) === false;
            });

            if (propError) {
                setTableError(+row.index + 1, propError, tableName);
            }
        }
    };

    // for every table
    if (tableName.includes('Export')) {
        const possibleEmptyProps = [
            'terms',
            'sort',
            'msc',
            'consignee',
            'packSp',
            'sortSp',
        ];
        checkProps(possibleEmptyProps);
    }
    if (tableName === 'Mates') {
        const possibleEmptyProps = ['sort', 'periodCreation', 'reice', 'operation'];
        checkProps(possibleEmptyProps);
    }
    if (tableName === 'Inner') {
        const possibleEmptyProps = ['sort'];
        checkProps(possibleEmptyProps);
    }
};
