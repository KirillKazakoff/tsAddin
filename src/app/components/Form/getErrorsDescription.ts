import { messages } from './messagesValidation';

/* eslint-disable no-param-reassign */
export default function getErrorsDescription(errors: any) {
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
