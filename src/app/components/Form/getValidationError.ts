import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';
import { messages } from './messagesValidation';

/* eslint-disable no-param-reassign */
function getErrorsDescription(errors: any) {
    const res = Object.entries(errors).reduce<{ [key: string]: any }>(
        (total, [key, value]) => {
            try {
                total[key] = messages[key][value as string];
                return total;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(key, e);
                return total;
            }
        },
        {},
    );
    return res;
}

type ErrorsT = { [key: string]: string };

export const getValidationError = (
    values: { [key: string]: string | boolean },
    mutateErrorsCb: (errors: ErrorsT, valuesTrimed: any) => void,
) => {
    let errors: ErrorsT = {};
    const valuesTrimmed = Object.entries(values).reduce((total, [key, val]) => {
        if (typeof val === 'boolean') return total;
        total[key] = val.trim();
        return total;
    });

    mutateErrorsCb(errors, valuesTrimmed);
    if (!pageStatusStore.isValidation) errors = {};
    return getErrorsDescription(errors);
};
