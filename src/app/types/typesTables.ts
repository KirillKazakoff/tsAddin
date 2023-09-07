import {
    AgentT,
    BankProdavecT,
    ClientRuT,
    ConsigneeT,
    ContractT,
    PackageT,
    PortTamozhnyaT,
    PortZarubezhT,
    ProductionT,
    SellerT,
    SortAssortimentT,
    TransportT,
    VesselT,
} from './typesSP';

export type TermsT = 'CFR' | 'EXW' | 'FCA' | 'CFR (контейнер)';
export type TableStatusT = {
    statusType: 'ok' | 'notFilledTable';
    title: string;
    desc: string;
};

// Amount
export type AmountT = {
    str: string;
    count: number;
    fraction: {
        min: number;
        max: number;
    };
};
export type AmountObjT = {
    [key: string]: AmountT;
};

// Tables
export type MateRowT = {
    reice: string;
    konosament: string;
    date: string;
    transport: string;
    company: string;
    vessel: VesselT;
    product: ProductionT;
    amount: AmountObjT;
    pack: number;
    sort: string;
    operation: string;
    index: string;
};

export type ExportInitRowT = {
    contract: number;
    seller: string;
    bankSeller?: string;
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
    agreementNo: number;
    invoice: string;
    date: string;
    blNo: string;
    blMode: string;
    terms?: TermsT;
    sort: string;
    pack: number;
    msc: string;
    id: string;
    index: number;
    placesLeft?: string;
    datePusan?: string;
    dateClose?: string;
};

export type ExportRowT = {
    contract: ContractT;
    seller: SellerT;
    bankSeller?: BankProdavecT;
    agent: AgentT;
    vessel: VesselT;
    transport: TransportT;
    portFrom: PortTamozhnyaT;
    portTo: PortZarubezhT;
    consignee: ConsigneeT;
    product: ProductionT;
    amount: AmountObjT;
    packSp: PackageT;
    sortSp: SortAssortimentT;
    agreementNo: number;
    invoice: string;
    date: string;
    blNo: string;
    terms?: TermsT;
    sort: string;
    pack: number;
    msc: string;
    index: string;
    id: string;
    placesLeft?: string;
    datePusan?: string;
    dateClose?: string;
};

export type InnerRowT = {
    buyer: ClientRuT;
    seller: SellerT;
    contractNo: number;
    contractDate: string;
    transport: TransportT;
    vessel: VesselT;
    product: ProductionT;
    sort: string;
    pack: string;
    konosament: string;
    amount: AmountObjT;
    bankSeller: string;
    deliveryDate: string;
    paymentDate: string;
    index: string;
};

export type NordmileRowT = {
    contractNo: number;
    contractDate: string;
    seller: SellerT;
    buyer: string;
    producer: string;
    product: string;
    pack: PackageT;
    amount: AmountObjT;
    bankSeller: string;
    paymentDate: string;
};

export type InvoiceKTIRowT = {
    agreementNo: string;
    blNo: string;
    invoiceNo: string;
    vessel: VesselT;
    product: ProductionT;
    seller: SellerT;
    dateInvoice: string;
    index: string;
    amount: {
        price: number;
        priceTotal: number;
        placesTotal: number;
        days?: number;
        operationResult?: number;
    };
    dateStorageStart?: string;
    dateStorageEnd?: string;
    dateDischarge?: string;
    dateAccountSent?: string;
    operation?: string;
};

export type CertificateRowT = {
    blNo: string;
    rNo: string;
    agreementNo: string;
    contract: ContractT;
    seller: SellerT;
    amount: {
        placesRemain: number;
        placesTotal: number;
    };
    product: ProductionT;
    consignee: ConsigneeT;
    coNo: string;
    hcNo: string;
    iuuNo: string;
    country: string;
    date: string;
    index: string;
};

// utilstype
export type OperationT = 'export' | 'export_storage' | 'certificates';

export type CommonRowT = (
    | ExportRowT
    | InnerRowT
    | MateRowT
    | InvoiceKTIRowT
    | CertificateRowT
) & {
    terms?: string;
};

export type TableNameT = 'Export' | 'Export_Storage' | 'Inner' | 'Mates';
