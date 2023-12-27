import { setSp } from './setSp';

export const setProduction = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        type: 'production',
        headers: {
            fullNameRu: 'Наименование',
            fullNameEng: 'Product name',
            code: 'Короткое наименование',
            expirationDate: 'Срок годности',
            packRu: 'Упаковка',
            packEng: 'Упаковка (eng)',
            standart: 'Стандарт',
            codeNew: 'Код',
            nds: 'НДС',
        },
        row: (r) => ({
            code: r.code.toLowerCase(),
            eng: {
                name: r.fullNameEng,
                pack: r.packEng || 'No package',
            },
            ru: {
                name: r.fullNameRu,
                pack: r.packRu || 'Нет упаковки',
            },
            expirationDate: r.expirationDate || 'ХХХ',
            standart: r.standart || 'Нет стандарта',
            nds: r.nds,
        }),
    });
};

export type ProductionT = ReturnType<typeof setProduction>[string];
