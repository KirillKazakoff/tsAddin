export const isNumber = (count: number) => {
    const res = Number.parseFloat(count.toString());
    if (Number.isNaN(res)) return false;

    return typeof res === 'number';
};
