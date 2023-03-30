/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import _ from 'lodash';
import numberToString from 'number-to-cyrillic';

export function formatCount(
    count: number,
    fractionMin: number,
    fractionMax: number,
) {
    const formatter = new Intl.NumberFormat('ru', {
        maximumFractionDigits: fractionMax,
        minimumFractionDigits: fractionMin,
        useGrouping: true,
    });

    return formatter.format(count);
}

// formatCurrency
export function formatCurrency(
    count: number,
    language: 'eng' | 'ru',
    fractionMin: number,
    fractionMax: number,
) {
    const formattedCount = formatCount(count, fractionMin, fractionMax);
    if (language === 'eng') {
        return `USD ${formattedCount}`;
    }
    return `$${formattedCount}`;
}

type ConvertedIntT = {
    convertedFractional: string;
    convertedInteger: string;
    fractional: number;
    fractionalCurrency: string;
    fractionalString: string;
    integer: number;
    integerCurrency: string;
    shortName: string;
};

export const formatCurrencyLong = (amount: number, language: 'en' | 'ru') => {
    const customCurrencyPrefixForEnglish = language === 'en' ? 'US' : '';
    const converted: ConvertedIntT = numberToString.convert(amount, {
        capitalize: true,
        currency: 'usd',
        language,
        customCurrencyPrefixForEnglish,
    });

    const {
        convertedInteger,
        fractionalCurrency,
        fractionalString,
        integerCurrency,
    } = converted;

    return `${convertedInteger} ${integerCurrency} ${fractionalString} ${fractionalCurrency}`;
};
