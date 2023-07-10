/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
    TableErrorT,
    tableError,
} from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { CommonRowT, TableNameT } from '../../../types/typesTables';

// checkFulfilledRow
export const checkIsErrorRow = (row: CommonRowT, tableName: TableNameT) => {
    const checkProps = (possibleEmptyProps: string[]) => {
        // checkEmpty
        for (const prop in row) {
            if (possibleEmptyProps.includes(prop)) return;

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

    // for every table
    if (tableName.includes('Export')) {
        const possibleEmptyProps = [
            'terms',
            'sort',
            'msc',
            'consignee',
            'packSp',
            'sortSp',
            'datePusan',
            'placesLeft',
            'dateClose',
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
