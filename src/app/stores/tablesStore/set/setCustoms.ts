/* eslint-disable no-param-reassign */
import tablesStore from '../tablesStore';
import { ExportRowT } from './setExport';
import { setTable } from './setTable';

const getDate = (dt: string) => {
    if (!dt) return '';

    const dateArr = dt.split('/')[1].split('');
    dateArr.splice(2, 0, '.');
    dateArr.splice(5, 0, '.');

    const transformed = dateArr.join('');
    return transformed;
};

export const setCustoms = (table: any[][]) => {
    return setTable({
        table,
        type: 'customsT',
        headers: {
            id: 'ID',
            declarationNoVTD: 'ДТ',
            declarationNoPVD: 'ПВД',
            blNo: 'BL',
            date: 'Дата декларирования',
        },
        row: (r) => {
            return {
                id: r.id,
                blNo: r.blNo,
                declaration: {
                    vtd: r.declarationNoVTD,
                    pvd: r.declarationNoPVD,
                },
                dateVTD: getDate(r.declarationNoVTD),
                datePVD: getDate(r.declarationNoPVD),
                agreement: <ExportRowT>{},
                agreementPVD: <ExportRowT>{},
            };
        },
        afterStoresInit: (r) => {
            r.agreement = [...tablesStore.exportStorageT, ...tablesStore.exportT].find(
                (exRow) => r.blNo === exRow.blNo,
            );
            r.agreementPVD = tablesStore.exportT.find((exRow) => r.blNo === exRow.blNo);
        },
    });
};

export type CustomsRowT = ReturnType<typeof setCustoms>['transformedTable'][number];
