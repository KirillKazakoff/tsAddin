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

export const getValidationError = (mutateErrorsCb: (errors: ErrorsT) => void) => {
    let errors: ErrorsT = {};
    mutateErrorsCb(errors);
    if (!pageStatusStore.isValidation) errors = {};
    return getErrorsDescription(errors);
};
