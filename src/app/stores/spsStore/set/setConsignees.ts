import { setSp } from './setSp';

export const setConsignees = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        type: 'consignees',
        headers: {
            code: 'ShortNM',
            fullName: 'Name',
            address: 'Adress',
        },
        row: (r) => ({
            addres: r.address,
            code: r.code,
            fullName: r.fullName,
        }),
    });
};

export type ConsigneeT = ReturnType<typeof setConsignees>[string];
