import letterStore from '../../../stores/letterStore/letterStore';
import { MateRowT } from '../../../types/typesTables';

export const checkOperation = ({ operation }: MateRowT) => {
    const { terms, isExport } = letterStore.fields;

    if (operation === 'Внутренний рынок' && !isExport) {
        return true;
    }

    if (!isExport) return false;

    if (operation === 'Экспорт' && terms === 'CFR') {
        return true;
    }
    if (operation === 'Хранение на экспорт' && terms === 'EXW') {
        return true;
    }
    return false;
};
