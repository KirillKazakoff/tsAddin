/* eslint-disable no-useless-escape */
import tablesStore from '../../stores/tablesStore/tablesStore';

export const transformInput = (input: string) => {
    const regexp = /([а-я А-Я A-Z a-z]+)(([-\/\s]+)?([\d]+)?(.+)?)/;
    const splitted = input.match(regexp);
    const [, name, suffix] = splitted;

    console.log(name, ' suffix: ', suffix);
};
