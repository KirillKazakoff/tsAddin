import { setSp } from './setSp';

export const setConsignees = (spRange: any[][]) => {
    setSp({
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
