export type MateRowT = {
    vessel: string;
    product: string;
    sort: string;
    amount: number;
    periodCreation: string;
    operation: string;
};

export type AmountT = {
    str: string;
    count: number;
};
type AmountObjT = {
    places: AmountT;
    placesTotal: AmountT;
    price: AmountT;
    priceTotal: AmountT;
};

export type ExportRowT = {
    contract: number;
    seller: string;
    buyer: string;
    vessel: string;
    transport: string;
    aggrementNo: number;
    invoice: string;
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
    amount: AmountObjT;
};

export type ExportStorageRowT = {
    contract: number;
    seller: string;
    buyer: string;
    vessel: string;
    transport: string;
    aggrementNo: number;
    invoice: string;
    date: string;
    blNo: string;
    msc: string;
    product: string;
    sort: string;
    pack: string;
    amount: AmountObjT;
    portTo: string;
    portFrom: string;
    consignee: string;
    id: string;
};

export type ExportCommonRow = (ExportStorageRowT | ExportRowT) & { terms?: string };
