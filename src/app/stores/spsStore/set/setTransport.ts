import { setSp } from './setSp';

export const setTransports = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'transports',
        headers: {
            code: 'Транспорт',
            nameEng: 'Transport',
            codeEng: 'Код',
            noSpec: 'Без Спецификации',
        },
        row: (r) => ({
            code: r.code,
            eng: { name: r.nameEng },
            ru: { name: r.code },
            id: r.codeEng,
        }),
    });
};
