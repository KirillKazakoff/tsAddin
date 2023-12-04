import { setTable } from './setTable';

export const setCustoms = (table: any[][]) => {
    setTable({
        table,
        type: 'customs',
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
