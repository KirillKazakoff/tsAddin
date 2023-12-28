import { setTable } from './setTable';

export const setCustoms = (table: any[][]) => {
    return setTable({
        table,
        type: 'customsT',
        headers: {
            id: 'ID',
            declarationNo: 'ДТ',
            blNo: 'BL',
        },
        row: (r) => ({
            id: r.id,
            blNo: r.blNo,
            declarationNo: r.declarationNo,
        }),
    });
};

export type CustomsRowT = ReturnType<typeof setCustoms>[number];
