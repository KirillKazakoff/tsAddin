import { ProductDescriptionT, VesselT } from './typesSP';

export type TableRowT = {
    vessel: string;
    product: string;
    sort: string;
    amount: number;
    periodCreation: string;
};

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
    vesselName: string;
    production: ProductionInfoT;
};

export type SubjectT = {
    [key: string]: string[];
};
