import { PortRuT, PortZarubezhT } from '../../types/typesSP';
import { initPortRu } from '../initStoreObjects';

export type LetterStoreT = {
    arrivalVld: string;
    arrivalForeign: string;
    payment: string;
    isExport: boolean;
    terms: string;
    ground: string;
    port: PortRuT | PortZarubezhT;
};

export const initLetterFields = () => {
    const initFields: LetterStoreT = {
        arrivalVld: '',
        arrivalForeign: '',
        payment: '',
        isExport: false,
        terms: '',
        ground: '',
        port: initPortRu(),
    };

    return initFields;
};
