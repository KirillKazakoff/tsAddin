import { setSp } from './setSp';

export const setConfidentialPhone = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        headers: {
            code: 'Код',
            name: 'Имя',
            fullName: 'Полное имя',
            phone: 'Телефон',
        },
        type: 'confidentialPhones',
        row: (r) => ({
            code: r.code,
            fullName: r.fullName,
            name: r.name,
            phone: r.phone,
        }),
    });
};

export type ConfidentialPhoneT = ReturnType<typeof setConfidentialPhone>[string];
