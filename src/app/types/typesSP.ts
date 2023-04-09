export type TransportT = {
    eng: {
        name: string;
    };
    ru: {
        name: string;
    };
    id: string;
};

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

export type VesselsT = {
    [key: string]: VesselT;
};

// Production
export type ProductDescriptionT = {
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

export type ProductionNewT = {
    [key: string]: ProductDescriptionT;
};

// Sellers
export type SellerT = {
    codeName: string;
    eng: {
        name: string;
        addres: string;
    };
    ru: {
        name: string;
        addres: string;
    };
    inn: string;
};

export type SellersT = {
    [key: string]: SellerT;
};

// Consignee
export type ConsigneeT = {
    codeName: string;
    fullName: string;
    adress: string;
};

export type ConsigneesT = {
    [key: string]: ConsigneeT;
};

// PortZarubezh
export type PortZarubezhT = {
    codeName: string;
    eng: {
        name: string;
        country: string;
    };
    ru: {
        name: string;
        country: string;
    };
};

export type PortsZarubezhT = {
    [key: string]: PortZarubezhT;
};

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

export type PortsTamozhnyaT = {
    [key: string]: PortTamozhnyaT;
};

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

export type ContractsT = {
    [key: string]: ContractT;
};

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
    };
    declination: string;
};

export type PodpisantsT = {
    [key: string]: PodpisantT;
};

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
    bankAdress: string;
    acNo: string;
    swift: string;
    adress: string;
};

export type AgentsT = {
    [key: string]: AgentT;
};

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
    adress: string;
    swift: string;
    intermediary: string;
    intermediaryAddres: string;
    intermediarySwift: string;
    accountNo: string;
};

export type BanksProdavecT = {
    [key: string]: BankProdavecT;
};
