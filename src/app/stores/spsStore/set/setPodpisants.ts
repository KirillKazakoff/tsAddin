import { setSp } from './setSp';

export const setPodpisants = (spRange: any[][]) => {
    const sp = setSp({
        table: spRange,
        type: 'podpisants',
        headers: {
            code: 'Подписант',
            declination: 'Подписант(Склонение)',
            nameEng: 'Signatory',
            commentRu: 'Коментарий',
            commentEng: 'Comment',
            position: 'Должность',
            faceReq: 'Реквизиты.в лице',
            sexReq: 'Реквизиты.пол',
            baseReqTRK: 'Реквизиты.Основание ТРК',
            baseReqMSI: 'Реквизиты.Основание МСИ',
        },
        row: (r) => ({
            code: r.code,
            declination: r.declination,
            eng: {
                comment: r.commentEng,
                name: r.nameEng,
            },
            ru: {
                comment: r.commentRu,
                name: r.code,
                position: r.position,
            },
            req: {
                face: r.faceReq,
                base: {
                    ТРК: r.baseReqTRK,
                    МСИ: r.baseReqMSI,
                },
                sex: r.sexReq,
            },
        }),
    });

    return sp;
};

export type PodpisantT = ReturnType<typeof setPodpisants>[string];
