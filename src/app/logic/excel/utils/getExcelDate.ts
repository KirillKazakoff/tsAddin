const calcExcelDate = (excelSerial: string) => {
    return new Date(Date.UTC(0, 0, +excelSerial - 1));
};

const getExcelDate = (month: Intl.DateTimeFormatOptions['month']) => (excelSerial: string, locale: string) => {
    return calcExcelDate(excelSerial).toLocaleString(locale, {
        day: 'numeric',
        month,
        year: 'numeric',
    });
};
export const getExcelDateStr = getExcelDate('long');
export const getExcelDateNumeric = getExcelDate('numeric');
export const getExcelDateShort = getExcelDate('2-digit');

export const getDeliveryDate = (
    excelSerial: string,
    locale: string,
    time: 'month' | 'day',
) => {
    const date = calcExcelDate(excelSerial);

    if (time === 'month') {
        date.setMonth(date.getMonth() + 1);
    }
    if (time === 'day') {
        date.setDate(date.getDate());
    }

    const res = date.toLocaleString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return res;
};

export const getNowDate = () => {
    return new Date().toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
};
