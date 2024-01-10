import { setSp } from './setSp';

export const setOrgForm = (spRange: any[][]) => {
    const res = setSp({
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

    return res;
};

export type OrgFormT = ReturnType<typeof setOrgForm>[string];
