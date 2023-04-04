export const checkEmptyTable = (table: any[][]) => {
    const check = table[0].every((value) => !value || value === '-');
    return check;
};
