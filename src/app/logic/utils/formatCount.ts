// export function formatCount(count: number | string) {
//     const str = count.toString();
//     return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
// }
import numberToString from 'number-to-cyrillic';

export function formatCount(
    count: number,
    maxFraction: number,
    minFraction: number,
) {
    const formatter = new Intl.NumberFormat('ru', {
        maximumFractionDigits: maxFraction,
        minimumFractionDigits: minFraction,
        useGrouping: true,
    });

    return formatter.format(count);
}

// formatCurrency
export function formatCurrency(
    count: number,
    language: 'eng' | 'ru',
    maxFraction: number,
    minFraction: number,
) {
    const formattedCount = formatCount(count, maxFraction, minFraction);
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
