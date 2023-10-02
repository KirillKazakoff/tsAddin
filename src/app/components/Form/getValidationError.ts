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

type FormKeyT<T> = keyof { [P in keyof T]: string };
export type ErrorsT<T> = { [P in FormKeyT<T>]: string } | Record<string, never>;

export const getValidationError = <FormValuesT>(
    values: FormValuesT,
    mutateErrorsCb: (errors: ErrorsT<FormValuesT>, valuesTrimed: FormValuesT) => void,
) => {
    let errors: ErrorsT<FormValuesT> = {};

    const valuesTrimmed = Object.entries(values).reduce<FormValuesT>(
        (total, [key, val]) => {
            if (typeof val === 'boolean') return total;
            total[key] = val.trim();
            return total;
        },
        {} as FormValuesT,
    );

    mutateErrorsCb(errors, valuesTrimmed);
    if (!pageStatusStore.isValidation) errors = {};
    return getErrorsDescription(errors);
};
