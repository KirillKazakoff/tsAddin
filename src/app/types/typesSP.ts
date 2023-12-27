import { Dictionary } from './typesUtils';

// Transport
export type TransportT = {
    code: string;
    eng: {
        name: string;
    };
    ru: {
        name: string;
        noSpec: string;
    };
    id: string;
};

export type TransportsT = Dictionary<TransportT>;

// Vessels
export type VesselT = {
    code: string;
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
    code: string;
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
    nds: string;
};

export type ProductionsT = Dictionary<ProductionT>;

// Package
export type PackageT = {
    code: string;
    vessel: string;
    name: string;
    pack: number;
    coefficient: number;
    fullName: string;
};

export type PackagesT = Dictionary<PackageT>;

// SortAssortiment
export type SortAssortimentT = {
    code: string;
    sort: string;
    product: string;
    weight: string;
};

export type SortsAssortimentT = Dictionary<SortAssortimentT>;

// Consignee
export type ConsigneeT = {
    code: string;
    fullName: string;
    addres: string;
};

export type ConsigneesT = Dictionary<ConsigneeT>;

// PortZarubezh
export type PortZarubezhT = {
    code: string;
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
    code: string;
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
    code: string;
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
    req: {
        face: string;
        sex: string;
        base: string;
    };
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
    code: string;
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
    intermediaryAddress: string;
    intermediarySwift: string;
    accountNo: string;
    inner: {
        name: string;
        bik: string;
        ks: string;
        rs: string;
    };
};
export type BanksProdavecT = Dictionary<BankProdavecT>;

// OrgFormT
export type OrgFormT = {
    code: string;
    name: string;
};

export type OrgFormsT = Dictionary<OrgFormT>;

// Sellers
export type SellerT = {
    code: string;
    eng: {
        name: string;
        address: string;
    };
    ru: {
        shortName: string;
        name: string;
        address: string;
    };
    info: {
        inn: string;
        kpp: string;
        ogrn: string;
        okpo: string;
        phoneFax: string;
        mail: string;
    };
};

export type SellersT = Dictionary<SellerT>;

// ClientsSellRu
export type ClientRuT = {
    code: string;
    name: string;
    inn: string;
    phone: string;
    mail: string;
    req: {
        org: {
            form: OrgFormT;
            shortName: string;
            mail: string;
            mailAddress: string;
            phoneFax: string;
            address: string;
            kpp: string;
            ogrn: string;
            okpo: string;
        };
        podpisant: {
            face: string;
            shortName: string;
            sex: string;
            position: string;
            base: string;
        };
        bank: {
            name: string;
            bik: string;
            ks: string;
            rs: string;
        };
    };
};

export type ClientsRuT = Dictionary<ClientRuT>;

// PortsRu
export type PortRuT = {
    code: string;
    name: string;
    phone: string;
    director: string;
    mail: string;
};

export type PortsRuT = Dictionary<PortRuT>;

// Sales
export type ProductionSalesT = {
    name: string;
    code: string;
    expirationDate: number;
};

export type ProductionsSalesT = Dictionary<ProductionSalesT>;

export type ConfidentialPhoneT = {
    code: string;
    fullName: string;
    name: string;
    phone: string;
};

export type ConfidentialPhonesT = Dictionary<ConfidentialPhoneT>;
