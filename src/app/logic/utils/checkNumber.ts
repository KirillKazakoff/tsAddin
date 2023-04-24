export const checkNumber = (count: number) => {
    return typeof Number.parseFloat(count.toString()) === 'number';
};
