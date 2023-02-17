export type TableRowT = {
    vessel: string;
    product: string;
    sort: string;
    pack: number;
    amount: number;
    total: number;
};

export type ProductT = {
    sorts: string[];
    title: string;
    dateCreation: string;
};

export type ProductionT = {
    [key: string]: ProductT;
};

// LetterTypes
export type BodyRowT = {
    vesselName: string;
    production: ProductionT;
};
