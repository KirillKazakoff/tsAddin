const calcExcelDate = (excelSerial: number) => {
    return new Date(Date.UTC(0, 0, +excelSerial - 1));
};

const getExcelDate = (month: Intl.DateTimeFormatOptions['month']) => (excelSerial: number, locale: string) => {
    if (typeof excelSerial === 'string') return excelSerial;

    return calcExcelDate(excelSerial).toLocaleString(locale, {
        day: '2-digit',
        month,
        year: 'numeric',
    });
};
export const getExcelDateStr = getExcelDate('long');
export const getExcelDateShort = getExcelDate('2-digit');

export const getDeliveryDate = (
    excelSerial: number,
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
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return res;
};

export const getNowDate = () => {
    return new Date().toLocaleString('ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
