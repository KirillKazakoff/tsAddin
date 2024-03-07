import { selectSp } from '../select';
import { setSp } from './setSp';

export const setClientsRu = (spRange: any[][]) => {
    const res = setSp({
        table: spRange,
        type: 'clientsRu',
        headers: {
            fullNameCompany: 'Полное наименование',
            form: 'Реквизиты.Форма',
            code: 'Краткое наименование',
            shortNameCompany: 'Реквизиты.краткое наименование',
            inn: 'ИНН',
            phone: 'Телефон',
            mailMain: 'Элект.почта',
            mailReq: 'Реквизиты.email',
            phoneFaxReq: 'Реквизиты.тел/факс',
            addressReq: 'Реквизиты.адрес',
            mailReqAddress: 'Реквизиты.почтовый адрес',
            kppReq: 'Реквизиты.КПП',
            ogrnReq: 'Реквизиты.ОГРН',
            okpoReq: 'Реквизиты.ОКПО',
            bankNameReq: 'Реквизиты.Банк',
            bikReq: 'Реквизиты.БИК',
            ksReq: 'Реквизиты.к/с',
            rsReq: 'Реквизиты.р/с',
            faceReq: 'Реквизиты.в лице',
            sexReq: 'Реквизиты.пол',
            basisReq: 'Реквизиты.Основание',
            positionReq: 'Реквизиты.должность',
            podpisantShortNameReq: 'Реквизиты.ФИО короткое',
        },
        row: (r) => ({
            code: r.code,
            mail: r.mailMain,
            name: r.fullNameCompany,
            orgName: `${r.form} "${r.fullNameCompany}"`,
            phone: r.phone,
            inn: r.inn,
            req: {
                bank: {
                    bik: r.bikReq,
                    ks: r.ksReq,
                    name: r.bankNameReq,
                    rs: r.rsReq,
                },
                org: {
                    address: r.addressReq,
                    form: selectSp.orgForm(r.form),
                    kpp: r.kppReq,
                    mail: r.mailReq,
                    mailAddress: r.mailReqAddress,
                    ogrn: r.ogrnReq,
                    okpo: r.okpoReq,
                    phoneFax: r.phoneFaxReq,
                    shortName: r.shortNameCompany,
                },
                podpisant: {
                    base: r.basisReq,
                    face: r.faceReq,
                    position: r.positionReq,
                    sex: r.sexReq,
                    shortName: r.podpisantShortNameReq,
                },
            },
        }),
    });

    return res;
};

export type ClientRuT = ReturnType<typeof setClientsRu>[string];
