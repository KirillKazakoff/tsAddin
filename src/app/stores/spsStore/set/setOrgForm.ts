import { setSp } from './setSp';

export const setOrgForm = (spRange: any[][]) => {
    setSp({
        type: 'orgForms',
        table: spRange,
        headers: {
            code: 'Код',
            name: 'Наименование',
        },
        row: (r) => ({
            code: r.code,
            name: r.name,
        }),
    });
};
