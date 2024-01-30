import { setSp } from './setSp';

export const setSellers = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        type: 'sellers',
        headers: {
            code: 'Компания',
            orgForm: 'Форма',
            fullNameOrg: 'Полное наименование',
            fullNameRu: 'Реквизиты.Полное наименование',
            shortName: 'Краткое наименование',
            addressRu: 'Адрес',
            nameEng: 'Company Name',
            addressEng: 'Address',
            codeEng: 'Code',
            inn: 'ИНН',
            kpp: 'КПП',
            ogrn: 'ОГРН',
            okpo: 'ОКПО',
            phoneFax: 'Телефон/факс ',
            mail: 'Электронный адрес',
        },
        row: (r) => ({
            code: r.code,
            info: {
                inn: r.inn,
                kpp: r.kpp,
                mail: r.mail,
                ogrn: r.ogrn,
                okpo: r.okpo,
                phoneFax: r.phoneFax,
            },
            eng: {
                address: r.addressEng,
                name: r.nameEng,
            },
            ru: {
                fullNameOrg: r.fullNameOrg,
                shortName: r.shortName,
                address: r.addressRu,
                name: r.fullNameRu,
            },
        }),
    });
};

export type SellerT = ReturnType<typeof setSellers>[string];
