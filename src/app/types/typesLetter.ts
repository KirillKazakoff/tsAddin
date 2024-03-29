import { ProductionT } from '../stores/spsStore/set/setProduction';
import { VesselT } from '../stores/spsStore/set/setVessels';
import type { AmountT } from '../stores/tablesStore/utils/initAmount';

// DictionaryTypes
export type DictionaryT = {
    getSubject: (info: string) => string;
    getHeader: (
        product: string,
        vessels: string,
        transport: string,
        port?: string
    ) => string;
};

// ProductionInfoTypes
export type ProductInfoT = {
    desc: ProductionT;
    producer: VesselT;
};

export type DetailsT = {
    amount: AmountT;
    sort: string;
};

export type ProductT = {
    details: DetailsT[];
    info: ProductInfoT;
};

export type ProductionInfoT = {
    [key: string]: ProductT;
};

// LetterTypes
export type BodyRowT = {
    vessel: VesselT;
    production: ProductionInfoT;
};

export type SubjectT = {
    [key: string]: string[];
};

// toStr
export type ProductionToStr = (
    bodyRow: BodyRowT,
    callback: (product: ProductT) => string
) => string;

export type LanguageT = 'eng' | 'ru';
