import { setSp } from './setSp';

export const setPodpisants = (spRange: any[][]) => {
    return setSp({
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
            baseReq: 'Реквизиты.Основание',
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
                base: r.baseReq,
                sex: r.sexReq,
            },
        }),
    });
};

export type PodpisantT = ReturnType<typeof setPodpisants>[string];
