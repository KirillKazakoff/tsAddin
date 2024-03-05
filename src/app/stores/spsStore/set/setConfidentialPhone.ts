import { setSp } from './setSp';

export const setConfidentialPhone = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        headers: {
            code: 'Код',
            name: 'Имя',
            fullName: 'Полное имя',
            phone: 'Телефон',
            passport: 'Паспорт',
            passportInfo: 'Выдан',
        },
        type: 'confidentialPhones',
        row: (r) => ({
            code: r.code,
            fullName: r.fullName,
            name: r.name,
            phone: r.phone,
            passport: r.passport,
            passportInfo: r.passportInfo,
        }),
    });
};

export type ConfidentialPhoneT = ReturnType<typeof setConfidentialPhone>[string];
