import type { TableKeyT } from '../stores/tablesStore/tablesStore';

export type TermsT = 'CFR' | 'EXW' | 'FCA' | 'DAP' | 'CFR(Контейнер)';

export type CommonRowT = {
    index: string;
    terms?: TermsT | '';
    type: TableKeyT;
};

export type TableStatusT = {
    statusType: 'ok' | 'notFilledTable' | 'empty';
    title: string;
    desc: string;
};

export interface ExportInitRowT {
    contract: number;
    seller: string;
    bankSeller?: string;
    declarationNo?: string;
    agent: string;
    vessel: string;
    transport: string;
    portFrom: string;
    portTo: string;
    consignee: string;
    product: string;
    places: number;
    placesTotal: number;
    price: number;
    priceTotal: number;
    agreementNo: string;
    invoice: string;
    date: string;
    blNo: string;
    blMode: string;
    sort: string;
    pack: number;
    msc: string;
    id: string;
    idProduct: string;
    placesLeft?: string;
    datePusan?: string;
    dateClose?: string;
    terms: TermsT;
    currency: string;
}

// utilstype
export type OperationT = 'export' | 'export_storage' | 'certificates';
