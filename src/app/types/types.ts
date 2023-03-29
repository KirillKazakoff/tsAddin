import { ProductDescriptionT, VesselT } from './typesSP';

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
    desc: ProductDescriptionT;
    producer: VesselT;
    periodCreation: string;
};

export type DetailsT = {
    amount: number;
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

// RequestType
export type RequestObjT = {
    url?: string;
    settings?: RequestInit;
};
