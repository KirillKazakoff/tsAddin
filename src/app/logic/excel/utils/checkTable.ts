/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { tableError } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { CommonRowT, TableNameT } from '../../../types/typesTables';
import { checkNumber } from '../../utils/checkNumber';

export const checkEmptyTable = (table: any[][]) => {
    const check = table[0].every((value) => !value || value === '-');
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
            if (!checkNumber(row.amount)) {
                setTableError(+row.index + 1, 'amount', tableName);
            }
            return;
        }

        const propError = Object.keys(row.amount).find((key) => {
            return row.amount[key].str === 'не число';
        });
        if (propError) {
            setTableError(+row.index + 1, propError, tableName);
        }
    };

    // for every table
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
