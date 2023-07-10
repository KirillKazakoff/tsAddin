/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
    TableErrorT,
    tableError,
} from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { CommonRowT, TableNameT } from '../../../types/typesTables';
import { isNumber } from '../../utils/isNumber';

export const checkEmptyTable = (table: any[][]) => {
    const check = table[0].every(
        (value) => !value
            || value === '-'
            || value === ' '
            || value === '-M'
            || value === '-T'
            || value === '#N/A',
    );
    return check;
};

// checkFulfilledRow

export const checkNotFulfilledRow = (row: CommonRowT, tableName: TableNameT) => {
    const checkProps = (possibleEmptyProps: string[]) => {
        // checkEmpty
        for (const prop in row) {
            const value = row[prop];

            if (!value && !possibleEmptyProps.includes(prop)) {
                const error: TableErrorT = {
                    row: +row.index + 1,
                    prop,
                    tableName,
                    desc: 'Пустая ячейка',
                };
                pageStatusStore.setPageStatus(tableError(error));
                return;
            }
        }

        // // checkAmountError
        // if (typeof row.amount === 'number') {
        //     if (!isNumber(row.amount)) {
        //         setTableError(+row.index + 1, 'amount', tableName);
        //     }
        // } else {
        //     const keys = Object.keys(row.amount);

        //     const propError = keys.find((key) => {
        //         const { count } = row.amount[key];
        //         return isNumber(count) === false;
        //     });

        //     if (propError) {
        //         setTableError(+row.index + 1, propError, tableName);
        //     }
        // }
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
        if (row.terms === 'FCA') {
            possibleEmptyProps.push('blNo', 'portFrom');
        }

        checkProps(possibleEmptyProps);
    }
    if (tableName === 'Mates') {
        const possibleEmptyProps = ['sort', 'periodCreation', 'reice', 'operation'];
        checkProps(possibleEmptyProps);
    }
    if (tableName === 'Inner') {
        const possibleEmptyProps = ['sort', 'deliveryDate', 'paymentDate'];
        checkProps(possibleEmptyProps);
    }
};
