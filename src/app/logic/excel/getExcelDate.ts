export const getExcelDate = (excelSerial: string) => {
    return new Date(Date.UTC(0, 0, +excelSerial - 1));
};
