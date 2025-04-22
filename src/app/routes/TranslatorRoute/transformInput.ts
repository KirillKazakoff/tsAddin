/* eslint-disable no-useless-escape */

export const transformInput = (input: string) => {
    const emptyInput = { name: '', suffix: '' };
    if (!input) return emptyInput;

    const regexp = /([а-я А-Я A-Z a-z]+)(([-\/\s]+)?([\d]+)?(.+)?)/;
    const splitted = input.toString().match(regexp);
    if (!splitted?.length) return emptyInput;

    const [, name, suffix] = splitted;
    return { name, suffix };
};
