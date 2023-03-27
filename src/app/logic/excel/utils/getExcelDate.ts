export const getExcelDate = (excelSerial: string) => {
    return new Date(Date.UTC(0, 0, +excelSerial - 1));
};

export const getExcelDateStr = (excelSerial: string, locale: string) => {
    return getExcelDate(excelSerial).toLocaleString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};
