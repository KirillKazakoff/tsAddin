import { CertificateRowT } from '../../../stores/tablesStore/set/setCertificates';

/* eslint-disable no-param-reassign */
export type COHCT = 'no' | 'cohc' | 'co' | 'hc';

export const setCOHCStatus = (rows: CertificateRowT[]) => {
    const isCO = rows.some((row) => row.coNo);
    const isHC = rows.some((row) => row.hcNo);

    if (isCO && isHC) {
        return 'cohc';
    }
    if (isCO) {
        return 'co';
    }
    if (isHC) {
        return 'hc';
    }

    return 'no';
};

export const matchCOHCLanguage = (status: COHCT, language: 'eng' | 'ru') => {
    const matchDictionary = {
        eng: {
            common: 'set of',
            status: {
                co: 'certificates of Origin',
                hc: 'Health certificates',
                cohc: 'certificates of Origin and Health certificates',
                no: '',
            },
        },
        ru: {
            common: 'комплект',
            status: {
                co: 'сертификатов происхождения',
                hc: 'сертификатов здоровья',
                cohc: 'сертификатов происхождения и сертификатов здоровья',
                no: '',
            },
        },
    };

    const dictionary = matchDictionary[language];

    return `${dictionary.common} ${dictionary.status[status]}`;
};
