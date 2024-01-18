import { setSp } from './setSp';

export const setPackages = (spRange: any[][]) => {
    const getType = (fullName: string) => {
        const res = fullName.toLowerCase().includes('мешок') ? 'BAG' : 'CARTOON';
        return res;
    };

    return setSp({
        table: spRange,
        type: 'packages',
        headers: {
            codeName: 'Ключ',
            vessel: 'Судно',
            production: 'Продукция',
            pack: 'Упаковка',
            coefficient: 'Коэффициент вес',
            fullName: 'Наименование',
        },
        row: (r) => ({
            code: r.codeName,
            coefficient: +r.coefficient,
            vessel: r.vessel,
            fullName: r.fullName,
            type: getType(r.fullName),
            name: r.production,
            pack: r.pack,
        }),
    });
};

export type PackageT = ReturnType<typeof setPackages>[string];
