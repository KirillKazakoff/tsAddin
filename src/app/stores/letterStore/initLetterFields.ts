import { LetterFieldsT } from '../../types/typesStore';

type DebugStr = 'dev' | 'build';

export const initLetterFields = (debugStr: DebugStr) => {
    const clearFields: LetterFieldsT = {
        arrivalVld: '',
        arrivalForeign: '',
        payment: '',
        isExport: false,
        terms: '',
        ground: '',
        port: 'Busan',
    };
    const debugFields = {
        arrivalVld: '18.03.23',
        arrivalForeign: '21.02.23',
        payment: '10.02.23',
        isExport: true,
        terms: 'CFR',
        ground: 'Okhotsk Sea',
        port: 'Busan',
    };

    return debugStr === 'dev' ? debugFields : clearFields;
};
