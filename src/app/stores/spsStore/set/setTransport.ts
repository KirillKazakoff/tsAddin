import { setSp } from './setSp';

export const setTransports = (spRange: any[][]) => {
    return setSp({
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
            ru: { name: r.code, noSpec: r.noSpec },
            id: r.codeEng,
        }),
    });
};

export type TransportT = ReturnType<typeof setTransports>[string];
