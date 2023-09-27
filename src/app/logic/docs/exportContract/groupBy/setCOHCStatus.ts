/* eslint-disable no-param-reassign */
import { AgreementT } from './initAgreement';

export type COHCT = 'no' | 'cohc' | 'co' | 'hc';

export const setCOHCStatus = (agreement: AgreementT) => {
    const isCO = agreement.rows.some((row) => row.coNo);
    const isHC = agreement.rows.some((row) => row.hcNo);

    if (isCO && isHC) {
        agreement.cohc = 'cohc';
    } else if (isCO) {
        agreement.cohc = 'co';
    } else if (isHC) {
        agreement.cohc = 'hc';
    }

    return agreement;
};

export const matchCOHCLanguage = (status: COHCT, language: 'eng' | 'ru') => {
    const matchDictionary = {
        eng: <{ [key in COHCT]: string }>{
            co: 'Certificate of Origin',
            hc: 'Health Certificate',
            cohc: 'Certificate of Origin and Health Certificate',
            no: '',
        },
        ru: <{ [key in COHCT]: string }>{
            co: 'Сертификат Происхождения',
            hc: 'Сертификат Здоровья',
            cohc: 'Сертификат Происхождения и Сертификат Здоровья',
            no: '',
        },
    };

    return matchDictionary[language][status];
};
