import { LetterFieldsT } from '../../types/typesStore';

export const initLetterFields = () => {
    const mode = process.env.NODE_ENV;

    const clearFields: LetterFieldsT = {
        arrivalVld: '',
        arrivalForeign: '',
        payment: '',
        isExport: false,
        terms: '',
        ground: '',
        port: '',
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

    return mode === 'production' ? clearFields : debugFields;
    return clearFields;
};
