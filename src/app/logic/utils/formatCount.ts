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
