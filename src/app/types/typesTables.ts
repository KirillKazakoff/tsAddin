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

export type MateRowT = {
    vessel: string;
    product: string;
    sort: string;
    amount: number;
    periodCreation: string;
    operation: string;
    index: string;
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
