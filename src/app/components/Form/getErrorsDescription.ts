import { messages } from './messagesValidation';

/* eslint-disable no-param-reassign */
export default function getErrorsDescription(errors: any) {
    const res = Object.entries(errors).reduce<{ [key: string]: any }>(
        (total, [key, value]) => {
            total[key] = messages[key][value as string];
            return total;
        },
        {},
    );
    return res;
}
