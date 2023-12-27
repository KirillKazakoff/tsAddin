import { setSp } from './setSp';

export const setOrgForm = (spRange: any[][]) => {
    return setSp({
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

export type OrgFormT = ReturnType<typeof setOrgForm>[string];
