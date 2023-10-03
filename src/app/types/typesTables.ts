import type { TableKeyT } from '../stores/tablesStore/tablesStore';
import type { AmountObjT } from '../stores/tablesStore/utils/initAmount';
import {
    AgentT,
    BankProdavecT,
    ClientRuT,
    ConsigneeT,
    ContractT,
    PackageT,
    PortTamozhnyaT,
    PortZarubezhT,
    ProductionSalesT,
    ProductionT,
    SellerT,
    SortAssortimentT,
    TransportT,
    VesselT,
} from './typesSP';

export type CommonRowT = {
    index: string;
    terms?: string;
    type: TableKeyT;
};

export type TermsT = 'CFR' | 'EXW' | 'FCA' | 'CFR (контейнер)';
export type TableStatusT = {
    statusType: 'ok' | 'notFilledTable' | 'empty';
    title: string;
    desc: string;
};

// Tables
export interface MateRowT extends CommonRowT {
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
}

export interface ExportInitRowT {
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
    agreementNo: string;
    invoice: string;
    date: string;
    blNo: string;
    blMode: string;
    sort: string;
    pack: number;
    msc: string;
    id: string;
    placesLeft?: string;
    datePusan?: string;
    dateClose?: string;
    index: number;
    terms: TermsT;
}

type CertificateRowT = Partial<{
    coNo: string;
    hcNo: string;
    iuuNo: string;
    country: string;
    date: string;
}>;

export interface ExportRowT extends CommonRowT, CertificateRowT {
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
    agreementNo: string;
    invoice: string;
    date: string;
    blNo: string;
    sort: string;
    pack: number;
    msc: string;
    id: string;
    placesLeft?: string;
    datePusan?: string;
    dateClose?: string;
}

export interface InnerRowT extends CommonRowT {
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
}

export interface InvoiceKTIRowT extends CommonRowT {
    agreementNo: string;
    blNo: string;
    invoiceNo: string;
    vessel: VesselT;
    product: ProductionT;
    seller: SellerT;
    dateInvoice: string;
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
}

export interface NordmileRowT extends CommonRowT {
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
}

export interface SalesRowT extends CommonRowT {
    id: string;
    contractDate: string;
    seller: AgentT;
    buyer: ConsigneeT;
    blNo: string;
    transport: string;
    dateETA: string;
    port: string;
    vessel: string;
    product: ProductionSalesT;
    sort: string;
    pack: number;
    amount: AmountObjT;
    certificateDate: string;
    isLive: boolean;
}

// utilstype
export type OperationT = 'export' | 'export_storage' | 'certificates';
