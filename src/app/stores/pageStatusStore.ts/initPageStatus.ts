import { PageStatusT } from './pageMessages';

export const initPageStatus = (): PageStatusT => ({
    statusType: 'ok',
    title: 'Вернитесь назад',
    desc: 'Возвращайтесь...',
});
