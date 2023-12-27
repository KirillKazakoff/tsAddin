import { setSp } from './setSp';

export const setBanksProdavec = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        type: 'banksProdavec',
        headers: {
            code: 'Название',
            nameEng: 'Банк-получатель',
            address: 'Адрес Банка',
            swift: 'SWIFT',
            intermediary: 'Банк-посредник',
            intermediaryAddress: 'Адрес Посредника',
            intermediarySwift: 'SWIFT посредника',
            inForwardRu: 'В пользу',
            inForwardEng: 'In forward',
            accountNo: 'Счет №',
            innerName: 'РФ.Банк',
            innerBik: 'РФ.БИК',
            innerKs: 'РФ.к/с',
            innerRs: 'РФ.р/с',
        },
        row: (r) => ({
            code: r.code,
            eng: {
                name: r.nameEng,
                inForward: r.inForwardEng,
            },
            ru: {
                name: r.code,
                inForward: r.inForwardRu,
            },
            address: r.address,
            accountNo: r.accountNo,
            inner: {
                bik: r.innerBik,
                ks: r.innerKs,
                name: r.innerName,
                rs: r.innerRs,
            },
            intermediary: r.intermediary,
            intermediaryAddress: r.intermediaryAddress,
            intermediarySwift: r.intermediarySwift,
            swift: r.swift,
        }),
    });
};

export type BankProdavecT = ReturnType<typeof setBanksProdavec>[string];
