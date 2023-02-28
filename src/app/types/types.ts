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

export type ProductDescriptionT = {
    standart?: string;
    expirationDate?: string;
    title: string;
    pack: string;
};

export type ProductInfoT = {
    desc: ProductDescriptionT;
    producer: string;
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

export type ProductionT = {
    [key: string]: ProductT;
};

// LetterTypes
export type BodyRowT = {
    vesselName: string;
    production: ProductionT;
};

export type SubjectT = {
    [key: string]: string[];
};
