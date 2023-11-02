import { Dictionary } from './typesUtils';

// Transport
export type TransportT = {
    codeName: string;
    eng: {
        name: string;
    };
    ru: {
        name: string;
    };
    id: string;
};

export type TransportsT = Dictionary<TransportT>;

// Vessels
export type VesselT = {
    codeName: string;
    eng: {
        name: string;
    };
    ru: {
        name: string;
    };
    id: string;
};

export type VesselsT = Dictionary<VesselT>;

// Production
export type ProductionT = {
    codeName: string;
    eng: {
        name: string;
        pack: string;
    };
    ru: {
        name: string;
        pack: string;
    };

    standart: string;
    expirationDate: string;
};

export type ProductionsT = Dictionary<ProductionT>;

// Package
export type PackageT = {
    codeName: string;
    vessel: string;
    name: string;
    pack: number;
    coefficient: number;
};

export type PackagesT = Dictionary<PackageT>;

// SortAssortiment
export type SortAssortimentT = {
    codeName: string;
    sort: string;
    product: string;
    weight: string;
};

export type SortsAssortimentT = Dictionary<SortAssortimentT>;

// Sellers
export type SellerT = {
    codeName: string;
    eng: {
        name: string;
        address: string;
    };
    ru: {
        name: string;
        address: string;
    };
    inn: string;
};

export type SellersT = Dictionary<SellerT>;

// Consignee
export type ConsigneeT = {
    codeName: string;
    fullName: string;
    addres: string;
};

export type ConsigneesT = Dictionary<ConsigneeT>;

// PortZarubezh
export type PortZarubezhT = {
    codeName: string;
    eng: {
        name: string;
        country: string;
        countryFull: string;
    };
    ru: {
        name: string;
        country: string;
        countryFull: string;
    };
};

export type PortsZarubezhT = Dictionary<PortZarubezhT>;

// PortTamozhnyaT
export type PortTamozhnyaT = {
    codeName: string;
    eng: {
        name: string;
    };
    ru: {
        name: string;
    };
};

export type PortsTamozhnyaT = Dictionary<PortTamozhnyaT>;

// ContractsT
export type ContractT = {
    code: string;
    contractNo: string;
    date: string;
    seller: string;
    buyerFull: string;
    buyer: string;
    bankSeller: string;
    timeEnd: string;
    status: string;
};

export type ContractsT = Dictionary<ContractT>;

// PodpisantsT
export type PodpisantT = {
    codeName: string;
    eng: {
        name: string;
        comment: string;
    };
    ru: {
        name: string;
        comment: string;
        position: string;
    };
    declination: string;
};

export type PodpisantsT = Dictionary<PodpisantT>;

// AgentsT
export type AgentT = {
    code: string;
    eng: {
        signatory: string;
    };
    ru: {
        signatory: string;
    };
    name: string;
    beneficiaryBank: string;
    branch: string;
    bankAddress: string;
    acNo: string;
    swift: string;
    address: string;
};

export type AgentsT = Dictionary<AgentT>;

// BanksProdavec
export type BankProdavecT = {
    codeName: string;
    eng: {
        name: string;
        inForward: string;
    };
    ru: {
        name: string;
        inForward: string;
    };
    address: string;
    swift: string;
    intermediary: string;
    intermediaryAddres: string;
    intermediarySwift: string;
    accountNo: string;
};
export type BanksProdavecT = Dictionary<BankProdavecT>;

// ClientsSellRu
export type ClientRuT = {
    codeName: string;
    name: string;
    inn: string;
    phone: string;
    mail: string;
};

export type ClientsRuT = Dictionary<ClientRuT>;

// PortsRu
export type PortRuT = {
    codeName: string;
    name: string;
    phone: string;
    director: string;
    mail: string;
};

export type PortsRuT = Dictionary<PortRuT>;

// Sales
export type ProductionSalesT = {
    name: string;
    codeName: string;
    expirationDate: number;
};

export type ProductionsSalesT = Dictionary<ProductionSalesT>;

export type ConfidentialPhoneT = {
    codeName: string;
    fullName: string;
    name: string;
    phone: string;
};

export type ConfidentialPhonesT = Dictionary<ConfidentialPhoneT>;
