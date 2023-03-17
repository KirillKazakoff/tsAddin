import { PageStatusT } from '../../types/typesStore';

export const initPageStatus = (): PageStatusT => ({
    statusType: 'ok',
    title: 'Вернитесь назад',
    desc: 'Возвращайтесь...',
});
