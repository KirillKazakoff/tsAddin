import { setSp } from './setSp';

export const setVessels = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'vessels',
        headers: {
            code: 'Судно',
            nameEng: 'Vessel',
            codeSuffix: 'Код судна',
        },
        row: (r) => ({
            code: r.code,
            eng: { name: r.nameEng },
            ru: { name: r.code },
            id: r.codeSuffix,
        }),
    });
};
