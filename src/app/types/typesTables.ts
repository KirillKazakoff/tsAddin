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

// utilstype
export type OperationT = 'export' | 'export_storage';

export type CommonRowT = (ExportRowT | InnerRowT | MateRowT) & { terms?: string };

export type TableNameT = 'Export' | 'Export_Storage' | 'Inner' | 'Mates';
