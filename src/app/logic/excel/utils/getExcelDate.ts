const getExcelDate = (excelSerial: string) => {
    return new Date(Date.UTC(0, 0, +excelSerial - 1));
};

export const getExcelDateStr = (excelSerial: string, locale: string) => {
    return getExcelDate(excelSerial).toLocaleString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export const getExcelDateNumeric = (excelSerial: string, locale: string) => {
    return getExcelDate(excelSerial).toLocaleString(locale, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
};

export const getDeliveryDate = (excelSerial: string, locale: string) => {
    const date = getExcelDate(excelSerial);

    date.setMonth(date.getMonth() + 1);

    const res = date.toLocaleString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return res;
};
