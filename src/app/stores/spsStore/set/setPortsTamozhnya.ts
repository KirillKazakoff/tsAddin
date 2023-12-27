import { setSp } from './setSp';

export const setPortsTamozhnya = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        type: 'portsTamozhnya',
        headers: {
            code: 'Порт',
            engName: 'Port of Customs',
            ruName: 'Порт декларирования',
        },
        row: (r) => ({
            code: r.code,
            eng: {
                name: r.engName,
            },
            ru: {
                name: r.ruName,
            },
        }),
    });
};

export type PortTamozhnyaT = ReturnType<typeof setPortsTamozhnya>[string];
