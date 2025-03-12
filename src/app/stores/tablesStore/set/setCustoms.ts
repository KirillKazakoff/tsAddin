/* eslint-disable no-param-reassign */
import tablesStore from '../tablesStore';
import { ExportRowT } from './setExport';
import { setTable } from './setTable';

export const setCustoms = (table: any[][]) => {
    return setTable({
        table,
        type: 'customsT',
        headers: {
            id: 'ID',
            declarationNo: 'ДТ',
            blNo: 'BL',
            date: 'Дата декларирования',
        },
        row: (r) => {
            return {
                id: r.id,
                blNo: r.blNo,
                declarationNo: r.declarationNo,
                date: r.date,
                agreement: <ExportRowT>{},
            };
        },
        afterStoresInit: (r) => {
            r.agreement = [...tablesStore.exportStorageT, ...tablesStore.exportT].find(
                (exRow) => r.blNo === exRow.blNo,
            );
        },
    });
};

export type CustomsRowT = ReturnType<typeof setCustoms>['transformedTable'][number];
