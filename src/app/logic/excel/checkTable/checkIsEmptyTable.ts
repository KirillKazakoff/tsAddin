export const checkEmptyTable = (table: any[][]) => {
    const excludeValues = ['-', ' ', '-M', '-T', '#N/A'];
    const check = table[0].every((value) => !value || excludeValues.includes(value));
    return check;
};
