/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { tableNotFulfilled } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';
import { ExportRowT, InnerRowT, MateRowT } from '../../../types/typesTables';

type TableNameT = 'Export' | 'Export_Storage' | 'Inner' | 'Mates';

export const checkEmptyTable = (table: any[][]) => {
    const check = table[0].every((value) => !value || value === '-');
    return check;
};

export const checkNotFulfilledRow = (rowUnknownType: any, tableName: TableNameT) => {
    const checkProps = (row: any, possibleEmptyProps: string[]) => {
        for (const prop in row) {
            const value = row[prop];

            if (!value && !possibleEmptyProps.includes(prop)) {
                pageStatusStore.setPageStatus(
                    tableNotFulfilled({ tableName, row: row.index, prop }),
                );
                return;
            }
        }
    };

    if (tableName.includes('Export')) {
        const row = rowUnknownType as ExportRowT;
        const possibleEmptyProps = ['terms', 'sort', 'msc', 'consignee'];

        checkProps(row, possibleEmptyProps);
    }
    if (tableName === 'Mates') {
        const row = rowUnknownType as MateRowT;
        const possibleEmptyProps = ['sort', 'periodCreation'];

        checkProps(row, possibleEmptyProps);
    }
    if (tableName === 'Inner') {
        const row = rowUnknownType as InnerRowT;
        const possibleEmptyProps = ['sort'];

        checkProps(row, possibleEmptyProps);
    }
};
