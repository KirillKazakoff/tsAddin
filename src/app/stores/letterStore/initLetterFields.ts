import { PortRuT, PortZarubezhT, TransportT } from '../../types/typesSP';
import { initPortZarubezh, initTransport } from '../initStoreObjects';

export const initLetterFields = () => {
    const mode = process.env.NODE_ENV;

    type LetterFieldsT = {
        arrivalVld: string;
        arrivalForeign: string;
        payment: string;
        isExport: boolean;
        terms: string;
        ground: string;
        port: PortRuT | PortZarubezhT;
        transport: TransportT;
    };

    const initFields: LetterFieldsT = {
        arrivalVld: '',
        arrivalForeign: '',
        payment: '',
        isExport: false,
        terms: '',
        ground: '',
        port: initPortZarubezh(),
        transport: initTransport(),
    };
    const debugFields: LetterFieldsT = {
        arrivalVld: '18.03.23',
        arrivalForeign: '21.02.23',
        payment: '10.02.23',
        isExport: true,
        terms: 'CFR',
        ground: 'Okhotsk Sea',
        port: initPortZarubezh(),
        transport: initTransport(),
    };

    return mode === 'production' ? initFields : debugFields;
};
