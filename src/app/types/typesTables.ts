import { AgentT } from '../stores/spsStore/set/setAgents';
import { BankProdavecT } from '../stores/spsStore/set/setBanksProdavec';
import { ClientRuT } from '../stores/spsStore/set/setClientsRu';
import { ConsigneeT } from '../stores/spsStore/set/setConsignees';
import { ContractT } from '../stores/spsStore/set/setContracts';
import { PackageT } from '../stores/spsStore/set/setPackages';
import { PortTamozhnyaT } from '../stores/spsStore/set/setPortsTamozhnya';
import { PortZarubezhT } from '../stores/spsStore/set/setPortsZarubezh';
import { ProductionT } from '../stores/spsStore/set/setProduction';
import { ProductionSalesT } from '../stores/spsStore/set/setProductionSales';
import { SellerT } from '../stores/spsStore/set/setSellers';
import { SortAssortimentT } from '../stores/spsStore/set/setSortsAssortiment';
import { TransportT } from '../stores/spsStore/set/setTransport';
import { VesselT } from '../stores/spsStore/set/setVessels';
import type { TableKeyT } from '../stores/tablesStore/tablesStore';
import type { AmountObjT } from '../stores/tablesStore/utils/initAmount';

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

// Tables
export interface MateRowT extends CommonRowT {
    reice: string | number;
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
    declarationNo?: string;
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
    idProduct: string;
}

export interface CustomsDutiesRowT extends CommonRowT {
    id: string;
    blNo: string;
    declarationNo: string;
}

export interface InnerRowT extends CommonRowT {
    buyer: ClientRuT;
    seller: SellerT;
    id: string;
    contractDate: string;
    transport: TransportT;
    vessel: VesselT;
    product: ProductionT;
    sort: string;
    pack: string;
    packSp: PackageT;
    konosament: string;
    amount: AmountObjT;
    bankSeller: BankProdavecT;
    deliveryDate: string;
    paymentDate: string;
    terms: TermsT;
    port: PortTamozhnyaT;
}

export interface InvoiceKTIRowT extends CommonRowT {
    agreementNo: string;
    blNo: string;
    invoiceNo: string;
    vessel: VesselT;
    product: ProductionT;
    seller: SellerT;
    dateInvoice: string;
    amount: AmountObjT;
    days?: number;
    operationResult?: number;
    dateStorageStart?: string;
    dateStorageEnd?: string;
    dateDischarge?: string;
    dateAccountSent?: string;
    operation?: string;
}

export interface NordmileRowT extends CommonRowT {
    producer: string;
    contractNo: number;
    contractDate: string;
    seller: SellerT;
    buyer: string;
    product: string;
    pack: string;
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
