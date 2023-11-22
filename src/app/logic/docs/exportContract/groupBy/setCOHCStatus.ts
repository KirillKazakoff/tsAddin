/* eslint-disable no-param-reassign */
import { ExportRowT } from '../../../../types/typesTables';

export type COHCT = 'no' | 'cohc' | 'co' | 'hc';

export const setCOHCStatus = (rows: ExportRowT[]) => {
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
