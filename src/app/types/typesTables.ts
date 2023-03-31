export type MateRowT = {
    vessel: string;
    product: string;
    sort: string;
    amount: number;
    periodCreation: string;
    operation: string;
};

export type ExportRowT = {
    contract: number;
    seller: string;
    buyer: string;
    vessel: string;
    transport: string;
    aggrementNo: number;
    invoice: number;
    date: string;
    blNo: string;
    terms: string;
    portTo: string;
    portFrom: string;
    consignee: string;
    msc: string;
    product: string;
    sort: string;
    pack: number;
    amountPlaces: number;
    amountTotal: number;
    price: number;
    priceTotal: number;
};

export type ExportStorageRowT = {
    contract: number;
    seller: string;
    buyer: string;
    vessel: string;
    transport: string;
    aggrementNo: number;
    invoice: number;
    date: string;
    blNo: string;
    msc: string;
    product: string;
    sort: string;
    pack: string;
    amountPlaces: number;
    amountTotal: number;
    price: number;
    priceTotal: number;
    portTo: string;
    portFrom: string;
    consignee: string;
    id: string;
};

export type ExportCommonRow = ExportStorageRowT | ExportRowT;
