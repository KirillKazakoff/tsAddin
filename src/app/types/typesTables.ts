import {
    AgentT,
    BankProdavecT,
    ClientRuT,
    ConsigneeT,
    ContractT,
    PortTamozhnyaT,
    PortZarubezhT,
    ProductDescriptionT,
    SellerT,
    TransportT,
    VesselT,
} from './typesSP';

// Amount
export type AmountT = {
    str: string;
    count: number;
    fraction: {
        min: number;
        max: number;
    };
};
type AmountObjT = {
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
    product: ProductDescriptionT;
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
    terms?: string;
    sort: string;
    pack: string;
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
    product: ProductDescriptionT;
    amount: AmountObjT;
    agreementNo: number;
    invoice: string;
    date: string;
    blNo: string;
    terms?: string;
    sort: string;
    pack: string;
    msc: string;
    index: string;
};

export type InnerRowT = {
    buyer: ClientRuT;
    seller: SellerT;
    contractNo: number;
    contractDate: string;
    vessel: VesselT;
    product: ProductDescriptionT;
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

export type CommonRowT = ExportRowT | InnerRowT | MateRowT;

export type TableNameT = 'Export' | 'Export_Storage' | 'Inner' | 'Mates';
